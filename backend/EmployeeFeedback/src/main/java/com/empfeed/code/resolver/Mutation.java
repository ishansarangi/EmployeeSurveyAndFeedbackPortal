/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package com.empfeed.code.resolver;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.empfeed.code.exception.EmployeeNotFound;
import com.empfeed.code.exception.MessageThreadNotFound;
import com.empfeed.code.exception.TagCreateFailed;
import com.empfeed.code.exception.TagNotFound;
import com.empfeed.code.model.entity.Employee;
import com.empfeed.code.model.entity.Message;
import com.empfeed.code.model.entity.Message.MessageBuilder;
import com.empfeed.code.model.entity.MessageThread;
import com.empfeed.code.model.entity.Tag;
import com.empfeed.code.model.input.MessageInput;
import com.empfeed.code.model.input.TagInput;
import com.empfeed.code.model.input.ThreadInput;
import com.empfeed.code.model.input.ThreadTagInput;
import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.repository.TagRepository;
import com.empfeed.code.util.Constant.MessageSender;

import lombok.AllArgsConstructor;

/**
 * The class has all the graphQL mutations.
 * 
 * @version 1.0
 * @author Sabyasachi Mohanty,Kumar Prabhu Kalyan,Kirti Jha
 */
@AllArgsConstructor
public class Mutation implements GraphQLMutationResolver {

	private EmployeeRepository employeeRepository;
	private MessageThreadRepository messageThreadRepository;
	private MessageRepository messageRepository;
	private TagRepository tagRepository;

	public Employee newEmployee(String firstName, String lastName, String email, Long managerId) {
		// ,String userType
		Employee employee = new Employee();
		employee.setFirstName(firstName);
		employee.setLastName(lastName);
		// employee.setManagerId(managerId);
		employee.setCreatedAt(new Date());
		employee.setEmail(email);
		employeeRepository.save(employee);
		return employee;
	}

	/**
	 * This method creates a new message in the database mapped to a thread.
	 * 
	 * @param messageInput
	 * @return MessageThread
	 */
	public MessageThread newMessage(MessageInput messageInput) {
		MessageThread messageThread = messageThreadRepository.findOne(messageInput.getThreadId());

		if (messageThread == null) {
			throw new MessageThreadNotFound("Thread not found", messageInput.getThreadId());
		}

		messageThread.setModifiedAt(new Date());
		messageThread.setLatestText(messageInput.getText());
		MessageBuilder messageBuilder = Message.builder().text(messageInput.getText()).createdAt(new Date())
				.messageThread(messageThread);
		if (messageInput.getEmployeeId() == messageThread.getCreatedBy().getEmployeeId()) {
			messageBuilder.messageSender(MessageSender.EMPLOYEE.value());
			// This new message is sent by employee so change the read flags of manager.
			messageThread.getReadByEmployee().add(messageInput.getEmployeeId());
			messageThread.setReadByManagers(new HashSet<>());
		} else {
			messageBuilder.messageSender(MessageSender.MANAGER.value());
			// This new message is sent by employee so change the read flags of employee.
			messageThread.setReadByEmployee(new HashSet<>());
			messageThread.setReadByManagers(new HashSet<>(Arrays.asList(messageInput.getEmployeeId())));
		}
		messageThread.getMessages().add(messageBuilder.build());
		messageThreadRepository.save(messageThread);
		return messageThread;
	}

	/**
	 * This method creates a new thread in the database.
	 * 
	 * @param threadInput
	 * @return MessageThread
	 */
	public MessageThread newThread(ThreadInput threadInput) {
		MessageThread messageThread = new MessageThread();
		Employee sentToEmp = employeeRepository.findOne(threadInput.getSentTo());
		if (sentToEmp == null) {
			throw new EmployeeNotFound("Employee Id of the manager is invalid", threadInput.getSentTo());
		}
		messageThread.setSentTo(sentToEmp);
		messageThread.setSubject(threadInput.getSubject());
		messageThread.setCreatedAt(new Date());
		messageThread.setModifiedAt(new Date());
		messageThread.setLatestText(threadInput.getText());
		Employee createdByEmp = employeeRepository.findOne(threadInput.getEmployeeId());
		if (createdByEmp == null) {
			throw new EmployeeNotFound("Employee Id of the employee is invalid", threadInput.getEmployeeId());
		}
		messageThread.setCreatedBy(createdByEmp);
		messageThread.setMessages(new HashSet<>());
		messageThreadRepository.save(messageThread);

		Long threadId = messageThread.getThreadId();
		MessageThread messageThread1 = messageThreadRepository.findOne(threadId);
		Message message = Message.builder().text(threadInput.getText()).createdAt(new Date())
				.messageThread(messageThread1).messageSender(MessageSender.EMPLOYEE.value()).build();
		messageThread1.getMessages().add(message);
		// This new message is sent by employee so change the read flags of employee.
		messageThread1.getReadByEmployee().add(threadInput.getEmployeeId());
		messageThreadRepository.save(messageThread1);
		return messageThread1;
	}

	/**
	 * This method saves the state of the message, changes it to "read".
	 * 
	 * @param threadId
	 * @return MessageThread
	 */
	public MessageThread readMessageThread(Long threadId, Long employeeId) {
		Employee readByEmp = employeeRepository.findOne(employeeId);
		MessageThread messageThread = messageThreadRepository.findOne(threadId);
		if (readByEmp == null || messageThread == null) {
			new MessageThreadNotFound("Thread does not exist!", threadId);
		}

		if (readByEmp.equals(messageThread.getCreatedBy())) {
			// This is the manager in the thread.
			messageThread.getReadByEmployee().add(readByEmp.getEmployeeId());
		} else {
			// This is the employee in the thread.
			messageThread.getReadByManagers().add(readByEmp.getEmployeeId());
		}

		messageThreadRepository.save(messageThread);
		return messageThread;
	}

	/**
	 * This method creates a new tag in the database.
	 * 
	 * @param tagInput
	 * @return Tag
	 */
	public Tag newTag(TagInput tagInput) {
		Employee createdBy = employeeRepository.findOne(tagInput.getEmployeeId());
		if (createdBy == null) {
			throw new TagCreateFailed("Tag was not created, employeeID does not exist", tagInput.getEmployeeId());
		}
		Tag tag = Tag.builder().color(tagInput.getColor()).createdBy(createdBy).name(tagInput.getName())
				.totalMessages(0).build();
		tagRepository.save(tag);
		return tag;
	}

	/**
	 * This method removes tag/tags from a given thread.
	 * 
	 * @param threadTagInput
	 * @return
	 */
	public Tag removeTagFromThread(ThreadTagInput threadTagInput) {
		MessageThread messageThread = messageThreadRepository.findOne(threadTagInput.getThreadId());
		if (messageThread == null) {
			throw new MessageThreadNotFound("Thread not found", threadTagInput.getThreadId());
		} else {
			Tag toBeDeleted = tagRepository.findOne(threadTagInput.getTagId());

			Set<Tag> tagSet = new HashSet<>();
			for (Tag t : messageThread.getTags()) {
				if (t.getTagId().compareTo(threadTagInput.getTagId()) != 0)
					tagSet.add(t);
				else
					toBeDeleted.setTotalMessages(toBeDeleted.getTotalMessages() - 1);
			}
			tagRepository.save(toBeDeleted);
			messageThread.setTags(tagSet);
			messageThreadRepository.save(messageThread);

			return toBeDeleted;
		}
	}

	/**
	 * This method adds tag/tags to a given thread.
	 * 
	 * @param threadTagInput
	 * @return
	 */
	public Tag addTagToThread(ThreadTagInput threadTagInput) {
		Tag toBeAdded;
		MessageThread messageThread = messageThreadRepository.findOne(threadTagInput.getThreadId());
		if (messageThread == null) {
			throw new MessageThreadNotFound("Thread not found", threadTagInput.getThreadId());
		} else {
			toBeAdded = tagRepository.findOne(threadTagInput.getTagId());
			if (toBeAdded == null) {
				throw new TagNotFound("Tag not found for TagId", threadTagInput.getTagId());
			}
			for (Tag t : messageThread.getTags()) {
				if (t.getName().equals(toBeAdded.getName()) && t.getColor().equals(toBeAdded.getColor())) {
					throw new TagNotFound("Duplicate Tag in the thread", threadTagInput.getThreadId());
				}
			}

			toBeAdded.setTotalMessages(toBeAdded.getTotalMessages() + 1);
			tagRepository.save(toBeAdded);

			messageThread.getTags().add(toBeAdded);
			messageThreadRepository.save(messageThread);
		}
		return toBeAdded;
	}
	
	
	/**
	 * This method removes a tag.
	 * 
	 * @param Long tagId
	 * @return Tag
	 */
	public Tag removeTag(Long tagId) {
		Tag tag = tagRepository.getTagDetails(tagId);
		if (tag != null) {
			Iterable<MessageThread> threads = tag.getMessageThread();
			for (MessageThread thread : threads) {
				if (thread.getTags() != null) {
					thread.getTags().remove(tag);
				}
			}
			messageThreadRepository.save(threads);
			tagRepository.delete(tag);
		} else {
			throw new TagNotFound("Tag not found for TagId", tagId);
		}
		return tag;
	}

}

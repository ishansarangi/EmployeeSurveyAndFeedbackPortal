package com.empfeed.code.resolver;

import java.util.ArrayList;
import java.util.Date;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.empfeed.code.model.entity.Employee;
import com.empfeed.code.model.entity.Message;
import com.empfeed.code.model.entity.Message.MessageBuilder;
import com.empfeed.code.model.entity.MessageThread;
import com.empfeed.code.model.input.MessageInput;
import com.empfeed.code.model.input.ThreadInput;
import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.repository.TagRepository;
import com.empfeed.code.util.Constant.MessageSender;

import lombok.AllArgsConstructor;

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
		employee.setManagerId(managerId);
		employee.setCreatedAt(new Date());
		employee.setEmail(email);
		employeeRepository.save(employee);
		return employee;
	}

	public MessageThread newMessage(MessageInput messageInput) {
		MessageThread messageThread = messageThreadRepository.findOne(messageInput.getThreadId());

		if (messageThread == null) {
			//throw new MessageThreadNotFound("Thread not found", messageInput.getThreadId());
		}

		messageThread.setModifiedAt(new Date());
		messageThread.setLatestText(messageInput.getText());
		messageThread.setRead(Boolean.FALSE);
		MessageBuilder messageBuilder = Message.builder().text(messageInput.getText()).createdAt(new Date())
				.messageThread(messageThread);
		if (messageInput.getEmployeeId() == messageThread.getCreatedBy().getEmployeeId()) {
			messageBuilder.messageSender(MessageSender.EMPLOYEE.value());
		} else {
			messageBuilder.messageSender(MessageSender.MANAGER.value());
		}
		messageThread.getMessages().add(messageBuilder.build());
		messageThreadRepository.save(messageThread);
		return messageThread;
	}

	public MessageThread newThread(ThreadInput threadInput) {
		MessageThread messageThread = new MessageThread();
		messageThread.setSentTo(employeeRepository.findOne(threadInput.getSentTo()));
		messageThread.setSubject(threadInput.getSubject());
		messageThread.setCreatedAt(new Date());
		messageThread.setModifiedAt(new Date());
		messageThread.setLatestText(threadInput.getText());
		messageThread.setCreatedBy(employeeRepository.findOne(threadInput.getEmployeeId()));
		messageThread.setMessages(new ArrayList<>());
		messageThread.setRead(Boolean.FALSE);
		messageThreadRepository.save(messageThread);
		Long threadId = messageThread.getThreadId();
		MessageThread messageThread1 = messageThreadRepository.findOne(threadId);
		Message message = Message.builder().text(threadInput.getText()).createdAt(new Date())
				.messageThread(messageThread1).messageSender(MessageSender.EMPLOYEE.value()).build();

		messageThread1.getMessages().add(message);
		messageThreadRepository.save(messageThread1);
		return messageThread1;
	}

	public MessageThread readMessageThread(Long threadId) {
		MessageThread messageThread = messageThreadRepository.findOne(threadId);
		messageThread.setRead(Boolean.TRUE);
		messageThreadRepository.save(messageThread);
		return messageThread;
	}
}

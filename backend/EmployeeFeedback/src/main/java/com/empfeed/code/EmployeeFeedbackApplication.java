package com.empfeed.code;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.empfeed.code.model.entity.Employee;
import com.empfeed.code.model.entity.Message;
import com.empfeed.code.model.entity.MessageThread;
import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.repository.TagRepository;
import com.empfeed.code.resolver.Mutation;
import com.empfeed.code.resolver.Query;
import com.empfeed.code.util.Constant.MessageSender;
import com.empfeed.code.util.Constant.UserType;

@SpringBootApplication
public class EmployeeFeedbackApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeFeedbackApplication.class, args);
	}

	@Bean
	public Mutation mutation(EmployeeRepository employeeRepository, MessageThreadRepository messageThreadRepository,
			MessageRepository messageRepository, TagRepository tagRepository) {
		return new Mutation(employeeRepository, messageThreadRepository, messageRepository, tagRepository);
	}

	@Bean
	public Query query(EmployeeRepository employeeRepository, MessageThreadRepository messageThreadRepository,
			MessageRepository messageRepository, TagRepository tagRepository) {
		return new Query(employeeRepository, messageThreadRepository, messageRepository, tagRepository);
	}
	
	@Bean
	public CommandLineRunner demo(EmployeeRepository employeeRepository,
			MessageThreadRepository messageThreadRepository) {
		return (args) -> {

			// Entering users for testing purposes.
			Employee manager = new Employee();
			manager.setFirstName("Jim");
			manager.setLastName("Attwood");
			manager.setEmail("manager@gmail.com");
			manager.setUserType(UserType.MANAGER.value());
			manager.setManagerId(null);
			employeeRepository.save(manager);

			Employee employee = new Employee();
			employee.setFirstName("Kelly");
			employee.setLastName("Williams");
			employee.setManagerId(manager.getEmployeeId());
			employee.setEmail("employee@gmail.com");
			employee.setUserType(UserType.EMPLOYEE.value());
			employeeRepository.save(employee);

			// Entering a chat thread and messages for testing purposes.
			MessageThread thread = new MessageThread();
			thread.setSubject("test thread");
			thread.setSentTo(employeeRepository.findOne(manager.getEmployeeId()));
			thread.setCreatedBy(employeeRepository.findOne(employee.getEmployeeId()));
			thread.setMessages(new ArrayList<>());
			thread.setCreatedAt(new Date(System.currentTimeMillis() - 300 * 1000));
			messageThreadRepository.save(thread);

			Long threadId = thread.getThreadId();
			MessageThread messageThread1 = messageThreadRepository.findOne(threadId);
			messageThread1.getMessages().addAll(Arrays.asList(
					Message.builder()
					.text("Employee-I have concerns about XYZ...")
					.createdAt(new Date(System.currentTimeMillis() - 300 * 1000))
					.messageSender(MessageSender.EMPLOYEE.value())
					.messageThread(thread).build()
					,
					Message.builder()
					.text("Manager-I can resolve your issues!")
					.createdAt(new Date())
					.messageSender(MessageSender.MANAGER.value())
					.messageThread(thread).build()));
			
			messageThread1.setLatestText("Manager-I can resolve your issues!");
			messageThread1.setModifiedAt(new Date());
			messageThreadRepository.save(messageThread1);
		};
	}

}

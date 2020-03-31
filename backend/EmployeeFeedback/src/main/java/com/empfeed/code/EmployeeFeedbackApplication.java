package com.empfeed.code;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.empfeed.code.exception.GraphQLErrorAdapter;
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

import graphql.ExceptionWhileDataFetching;
import graphql.GraphQLError;
import graphql.servlet.GraphQLErrorHandler;

@SpringBootApplication
public class EmployeeFeedbackApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeFeedbackApplication.class, args);
	}
	
	@Bean
	public GraphQLErrorHandler errorHandler() {
		return new GraphQLErrorHandler() {
			@Override
			public List<GraphQLError> processErrors(List<GraphQLError> errors) {
				List<GraphQLError> clientErrors = errors.stream().filter(this::isClientError)
						.collect(Collectors.toList());

				List<GraphQLError> serverErrors = errors.stream().filter(e -> !isClientError(e))
						.map(GraphQLErrorAdapter::new).collect(Collectors.toList());

				List<GraphQLError> e = new ArrayList<>();
				e.addAll(clientErrors);
				e.addAll(serverErrors);
				return e;
			}

			protected boolean isClientError(GraphQLError error) {
				return !(error instanceof ExceptionWhileDataFetching || error instanceof Throwable);
			}
		};
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
			Employee manager1 = new Employee();
			manager1.setFirstName("Jim");
			manager1.setLastName("Attwood");
			manager1.setEmail("manager1@gmail.com");
			manager1.setUserType(UserType.MANAGER.value());
			manager1.setManagerId(null);
			employeeRepository.save(manager1);
			
			Employee manager2 = new Employee();
			manager2.setFirstName("Kelly");
			manager2.setLastName("Williams");
			manager2.setEmail("manager2@gmail.com");
			manager2.setUserType(UserType.MANAGER.value());
			manager2.setManagerId(manager1.getEmployeeId());
			employeeRepository.save(manager2);
			
			Employee manager3 = new Employee();
			manager3.setFirstName("Jessica");
			manager3.setLastName("Franklin");
			manager3.setEmail("manager3@gmail.com");
			manager3.setUserType(UserType.MANAGER.value());
			manager3.setManagerId(manager2.getEmployeeId());
			employeeRepository.save(manager3);

			Employee employee = new Employee();
			employee.setFirstName("Sunny");
			employee.setLastName("Mohanty");
			employee.setManagerId(manager3.getEmployeeId());
			employee.setEmail("employee1@gmail.com");
			employee.setUserType(UserType.EMPLOYEE.value());
			employeeRepository.save(employee);

			// Entering a chat thread and messages for testing purposes.
			MessageThread thread = new MessageThread();
			thread.setSubject("test thread");
			thread.setSentTo(employeeRepository.findOne(manager3.getEmployeeId()));
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

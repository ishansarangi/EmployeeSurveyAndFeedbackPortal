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
}

package com.empfeed.code;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.repository.TagRepository;
import com.empfeed.code.resolver.Mutation;

@SpringBootApplication
public class EmployeeFeedbackApplication {

	@Bean
	public Mutation mutation(EmployeeRepository employeeRepository, MessageThreadRepository messageThreadRepository,
			MessageRepository messageRepository, TagRepository tagRepository) {
		return new Mutation(employeeRepository, messageThreadRepository, messageRepository, tagRepository);
	}

	public static void main(String[] args) {
		SpringApplication.run(EmployeeFeedbackApplication.class, args);
	}

}

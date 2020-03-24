package com.empfeed.code.resolver;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.repository.TagRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Mutation implements GraphQLMutationResolver {

	private EmployeeRepository employeeRepository;
	private MessageThreadRepository messageThreadRepository;
	private MessageRepository messageRepository;
	private TagRepository tagRepository;
	
}
package com.empfeed.code.service;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.service.datafetcher.AllThreadFetcher;
import com.empfeed.code.service.datafetcher.EmployeeDataFetcher;

import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;

@Service
public class ManagerDetailsService {
	@Autowired
	EmployeeRepository empRepository;

	@Value("classpath:emp.graphql")
	Resource resource;

	private GraphQL graphQL;
	@Autowired
	private EmployeeDataFetcher detailFetcher;

	@PostConstruct
	private void loadSchema() throws IOException {

		File schemaFile = resource.getFile();
		TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaFile);
		RuntimeWiring wiring = buildRuntimeWiring();
		GraphQLSchema schema = new SchemaGenerator().makeExecutableSchema(typeRegistry, wiring);
		graphQL = GraphQL.newGraphQL(schema).build();
	}

	private RuntimeWiring buildRuntimeWiring() {
		return RuntimeWiring.newRuntimeWiring()
				.type("Query", typeWiring -> typeWiring.dataFetcher("managerDetails", detailFetcher))

				.build();
	}

	public GraphQL getGraphQL() {
		return graphQL;
	}
}

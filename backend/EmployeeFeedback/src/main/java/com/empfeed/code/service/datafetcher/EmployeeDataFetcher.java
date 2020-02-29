package com.empfeed.code.service.datafetcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.empfeed.code.repository.EmployeeRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public class EmployeeDataFetcher implements DataFetcher {

	@Autowired
	EmployeeRepository empRepository;

	@Override
	public Object get(DataFetchingEnvironment dataFetchingEnvironment) {
		return empRepository.findById(dataFetchingEnvironment.getArgument("id"));
	}

}

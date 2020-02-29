package com.empfeed.code.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empfeed.code.service.ManagerDetailsService;

import graphql.ExecutionResult;

@RequestMapping("/employee")
@RestController
public class EmployeeController {
	@Autowired
	ManagerDetailsService empService;

	@PostMapping
	public ResponseEntity<Object> getAllThreads(@RequestBody String query) {
		ExecutionResult execute = empService.getGraphQL().execute(query);

		return new ResponseEntity<>(execute, HttpStatus.OK);
	}
}

package com.empfeed.code.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empfeed.code.service.ThreadManagerService;

import graphql.ExecutionResult;

@RequestMapping("/manager/thread")
@RestController
public class ThreadManagerController {
	@Autowired
	ThreadManagerService threadService;

	@PostMapping
	public ResponseEntity<Object> getAllThreads(@RequestBody String query) {
		ExecutionResult execute = threadService.getGraphQL().execute(query);

		return new ResponseEntity<>(execute, HttpStatus.OK);
	}
}

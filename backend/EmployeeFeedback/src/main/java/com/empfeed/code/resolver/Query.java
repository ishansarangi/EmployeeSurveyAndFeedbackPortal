package com.empfeed.code.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.empfeed.code.model.entity.Employee;
import com.empfeed.code.model.entity.MessageThread;
import com.empfeed.code.repository.EmployeeRepository;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.MessageThreadRepository;
import com.empfeed.code.repository.TagRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Query implements GraphQLQueryResolver {
	
	private EmployeeRepository employeeRepository;
	private MessageThreadRepository messageThreadRepository;
	private MessageRepository messageRepository;
	private TagRepository tagRepository;
	
	
	public Iterable<Employee> findAllManagers(Long employeeId) {
    	//TODO: To recursively find all managers using 
    	// single inheritance relationship in JPA
    	//It returns the list of managers for now.
		Employee emp = employeeRepository.findOne(employeeId);
    	return employeeRepository.findManager(emp.getManagerId());
    }
    
    public Employee findEmployee(Long employeeId) {
    	return employeeRepository.findOne(employeeId);
    }
    
    public Iterable<MessageThread> findAllSentThreads(Long employeeId){
    		return messageThreadRepository.findAllSentThreads(employeeId);
    }
    
    public Iterable<MessageThread> findAllReceivedThreads(Long employeeId){
		return messageThreadRepository.findAllReceivedThreads(employeeId);
    }
    
    public Employee findEmployeeByEmail(String emailId) {
    	return employeeRepository.findEmployeeByEmail(emailId);
    }
}

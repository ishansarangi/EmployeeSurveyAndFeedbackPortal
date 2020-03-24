package com.empfeed.code.repository;

import org.springframework.data.repository.CrudRepository;

import com.empfeed.code.model.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}


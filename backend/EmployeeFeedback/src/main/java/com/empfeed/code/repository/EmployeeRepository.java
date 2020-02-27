package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empfeed.code.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}

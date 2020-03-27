package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.empfeed.code.model.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
	
	@Query("from Employee where email=:emailId")
	public Employee findEmployeeByEmail(@Param("emailId") String emailId);
}


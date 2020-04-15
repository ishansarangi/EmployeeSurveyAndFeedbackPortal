package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.empfeed.code.model.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {

	@Query("from Employee where email=:emailId")
	public Employee findEmployeeByEmail(@Param("emailId") String emailId);

	@Query("from Employee where employeeId=:employeeId")
	public Iterable<Employee> findManager(@Param("employeeId") Long employeeId);

	@Query(value = "WITH RECURSIVE ancestors(employee_id, manager_id, first_name, last_name,created_at, email, user_type,  lvl) AS ("
			+ "	SELECT cat.employee_id, cat.manager_id, cat.first_name, cat.last_name, cat.created_at, cat.email, cat.user_type, 1 AS lvl "
			+ "	FROM employee cat " 
			+ " WHERE cat.employee_id= :employeeId"
			+ "	UNION ALL "
			+ "	SELECT parent.employee_id, parent.manager_id, parent.first_name, parent.last_name, parent.created_at, parent.email, parent.user_type, child.lvl + 1 AS lvl "
			+ "	FROM employee parent JOIN ancestors child "
			+ "	ON parent.employee_id = child.manager_id )"
			+ "	SELECT employee_id,first_name, last_name, created_at, email, user_type, null as manager_id from ancestors where employee_id != :employeeId  ORDER BY lvl "
			, nativeQuery = true)
	public Iterable<Employee> findManagerHierarchy(@Param("employeeId") Long employeeId);
}
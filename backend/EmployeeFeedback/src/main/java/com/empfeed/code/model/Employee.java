package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table
@Entity
public @Data class Employee {

	@Id
	private Integer employeeId;
	private Integer managerId;
	private String firstName;
	private String lastName;
	private String email;
	private String createdAt;
	private Integer userType;
}

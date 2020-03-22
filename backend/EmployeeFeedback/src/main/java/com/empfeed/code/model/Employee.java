package com.empfeed.code.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Table
@Entity
public @Data class Employee {

	@Id
	@Column(name = "employee_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long employeeId;

	private Long managerId;

	private String firstName;

	private String lastName;

	private String email;

	private Date createdAt;

	private Integer userType;

}

package com.empfeed.code.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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

	@Temporal(value=TemporalType.TIMESTAMP)
	private Date createdAt;

	private Integer userType;

}

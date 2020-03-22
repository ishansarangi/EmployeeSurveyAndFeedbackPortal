package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table
public @Data class UserType {

	@Id
	private Integer userTypeId;
	private String userType;
}

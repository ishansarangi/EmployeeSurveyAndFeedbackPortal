package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class UserType {

	@Id
	private int userTypeId;
	private String userType;

	public UserType() {
	}

	public UserType(int userTypeId, String userType) {
		super();
		this.userTypeId = userTypeId;
		this.userType = userType;
	}

	public int getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

}

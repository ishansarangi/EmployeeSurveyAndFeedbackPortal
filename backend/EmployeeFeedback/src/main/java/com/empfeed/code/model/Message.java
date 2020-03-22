package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table
public @Data class Message {

	@Id
	private Integer messageId;
	private String text;
	private String createdAt;
	private Integer threadId;
	private Integer createdBy;
}

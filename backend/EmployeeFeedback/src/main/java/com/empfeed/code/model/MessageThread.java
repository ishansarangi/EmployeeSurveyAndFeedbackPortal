package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table
public @Data class MessageThread {

	@Id
	private Integer threadId;
	private Integer sentTo;
	private Integer tagId;
	private String subject;
	private String createdAt;
	private String modifiedAt;
	private Integer createdBy;
}

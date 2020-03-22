package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table
public @Data class Tag {
	@Id
	private Integer tagId;
	private String name;
	private String color;
	private Integer totalMessages;
	private Integer createdBy;
}

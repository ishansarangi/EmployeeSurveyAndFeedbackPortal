package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Tag {
	@Id
	private Integer tagId;
	private String name;
	private String color;
	private Integer totalMessages;
	private Integer createdBy;

	public Tag(int tagId, String name, String color, int totalMessages, int createdBy) {
		super();
		this.tagId = tagId;
		this.name = name;
		this.color = color;
		this.totalMessages = totalMessages;
		this.createdBy = createdBy;
	}

	public Tag() {
	}

	public int getTagId() {
		return tagId;
	}

	public void setTagId(int tagId) {
		this.tagId = tagId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getTotalMessages() {
		return totalMessages;
	}

	public void setTotalMessages(int totalMessages) {
		this.totalMessages = totalMessages;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

}

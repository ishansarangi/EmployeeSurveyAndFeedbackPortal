package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class Message {

	@Id
	private int messageId;
	private String text;
	private String createdAt;
	private int threadId;
	private int createdBy;

	public Message() {

	}

	public Message(int messageId, String text, String createdAt, int threadId, int createdBy) {
		super();
		this.messageId = messageId;
		this.text = text;
		this.createdAt = createdAt;
		this.threadId = threadId;
		this.createdBy = createdBy;
	}

	public int getMessageId() {
		return messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public int getThreadId() {
		return threadId;
	}

	public void setThreadId(int threadId) {
		this.threadId = threadId;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

}

package com.empfeed.code.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class MessageThread {

	@Id
	private int threadId;
	private int sentTo;
	private int tagId;
	private String subject;
	private String createdAt;
	private String modifiedAt;
	private int createdBy;

	public MessageThread(int threadId, int sentTo, int tagId, String subject, String createdAt, String modifiedAt,
			int createdBy) {
		super();
		this.threadId = threadId;
		this.sentTo = sentTo;
		this.tagId = tagId;
		this.subject = subject;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.createdBy = createdBy;
	}

	public MessageThread() {
	}

	public int getThreadId() {
		return threadId;
	}

	public void setThreadId(int threadId) {
		this.threadId = threadId;
	}

	public int getSentTo() {
		return sentTo;
	}

	public void setSentTo(int sentTo) {
		this.sentTo = sentTo;
	}

	public int getTagId() {
		return tagId;
	}

	public void setTagId(int tagId) {
		this.tagId = tagId;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(String modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

}

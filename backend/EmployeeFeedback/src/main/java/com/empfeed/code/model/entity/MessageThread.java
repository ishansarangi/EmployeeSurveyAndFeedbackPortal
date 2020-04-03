package com.empfeed.code.model.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;

@Entity
@Table
public @Data class MessageThread {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "thread_id")
	private Long threadId;

	@OneToOne
	private Employee sentTo;

	@OneToMany(mappedBy = "messageThread", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<Tag> tags = new HashSet<>();

	private String subject;

	private Date createdAt;

	private Date modifiedAt;

	private String latestText;

	@OneToOne
	private Employee createdBy;
	
	@Transient
	private Boolean read = false;

	@OneToMany(mappedBy = "messageThread", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Message> messages;
}

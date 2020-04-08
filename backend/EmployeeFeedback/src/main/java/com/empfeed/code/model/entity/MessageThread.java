package com.empfeed.code.model.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "thread_tag",
            joinColumns = {
                    @JoinColumn(name = "threadId", referencedColumnName = "thread_id"
                     )},
            inverseJoinColumns = {
                    @JoinColumn(name = "tagId", referencedColumnName = "tag_id"
                           )})
	private Set<Tag> tags = new HashSet<>();

	private String subject;

	@Temporal(value=TemporalType.TIMESTAMP)
	private Date createdAt;

	@Temporal(value=TemporalType.TIMESTAMP)
	private Date modifiedAt;

	private String latestText;

	@OneToOne
	private Employee createdBy;

	@Transient
	private Boolean read = false;

	@OneToMany(mappedBy = "messageThread", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderBy("createdAt")
	private Set<Message> messages;
}

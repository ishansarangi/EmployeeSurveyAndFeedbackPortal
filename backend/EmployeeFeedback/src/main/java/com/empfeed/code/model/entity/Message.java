package com.empfeed.code.model.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Setter(value = AccessLevel.PACKAGE)
@Getter
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long messageId;

	private String text;

	private Date createdAt;

	/**
	 * Refer to com.example.DemoGraphQL.util.Constant.MessageSender Enum
	 * messageSender - 1 means the employee created a new message in the thread.
	 * messageSender - 2 means the manager created a new message in the thread.
	 */
	private Integer messageSender;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "thread_id", nullable = false)
	private MessageThread messageThread;

}

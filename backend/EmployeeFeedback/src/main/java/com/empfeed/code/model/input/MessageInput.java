package com.empfeed.code.model.input;

import java.io.Serializable;

import lombok.Data;

public @Data class MessageInput implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long threadId;
	private String text;
	private Long employeeId;
}
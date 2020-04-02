package com.empfeed.code.model.input;

import java.io.Serializable;

import lombok.Data;


public @Data class ThreadTagInput implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long threadId;
	private Long employeeId;
	private Iterable<Long> tags;

}
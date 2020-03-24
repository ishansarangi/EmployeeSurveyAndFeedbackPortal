package com.empfeed.code.model.input;


import java.io.Serializable;

import lombok.Data;

public @Data class ThreadInput implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long sentTo;
	private String subject;
	private Long employeeId;
	private String text;
}

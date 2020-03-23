package com.empfeed.code.util;

public class Constant {

	public enum MessageSender {
		ME(1), THEM(2);
		Integer value;

		MessageSender(Integer value) {
			this.value = value;
		}
		public Integer value() {
			return value;
		}

	}

	public enum UserType {
		EMPLOYEE(1), MANAGER(2), ADMIN(3);
		Integer value;

		UserType(Integer value) {
			this.value = value;
		}
		
		public Integer value() {
			return value;
		}
	}
}

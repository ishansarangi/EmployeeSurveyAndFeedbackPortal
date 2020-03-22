package com.empfeed.code.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.empfeed.code.model.Message;
import com.empfeed.code.model.MessageThread;
import com.empfeed.code.repository.MessageRepository;

public class MessageThreadResolver implements GraphQLResolver<MessageThread> {

	private MessageRepository messageRepository;

	public MessageThreadResolver(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}

	public Iterable<Message> getMessage(MessageThread messageThread) {
		/*
		 * TODO: Need to get all messages based on the thread ID.
		 */
		return messageRepository.findAll();
	}
}
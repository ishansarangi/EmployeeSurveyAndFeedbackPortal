package com.empfeed.code.resolver;

import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.empfeed.code.model.entity.Message;
import com.empfeed.code.model.entity.MessageThread;
import com.empfeed.code.model.entity.Tag;
import com.empfeed.code.repository.MessageRepository;
import com.empfeed.code.repository.TagRepository;

@Component
public class MessageThreadResolver implements GraphQLResolver<MessageThread> {

	private MessageRepository messageRepository;
	private TagRepository tagRepository;

	public MessageThreadResolver(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}

	public Iterable<Message> getMessage(MessageThread messageThread) {
		return messageRepository.getMessageListForThreadId(messageThread.getThreadId());
	}
	
	public Iterable<Tag> getTags(MessageThread messageThread){
		return tagRepository.getTagListForThreadId(messageThread.getThreadId());
	}
	
}
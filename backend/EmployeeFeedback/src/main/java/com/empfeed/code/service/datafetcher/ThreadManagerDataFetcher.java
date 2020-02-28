package com.empfeed.code.service.datafetcher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.empfeed.code.model.MessageThread;
import com.empfeed.code.repository.MessageThreadRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public class ThreadManagerDataFetcher implements DataFetcher {
	 @Autowired
	    MessageThreadRepository threadRepository;

	    @Override
	    public List<MessageThread> get(DataFetchingEnvironment dataFetchingEnvironment) {
	        return threadRepository.findBySentTo(dataFetchingEnvironment.getArgument("id"));
	    

}
}

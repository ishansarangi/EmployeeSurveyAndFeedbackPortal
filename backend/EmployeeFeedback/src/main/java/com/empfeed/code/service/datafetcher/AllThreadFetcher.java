package com.empfeed.code.service.datafetcher;

import java.awt.print.Book;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.empfeed.code.model.MessageThread;
import com.empfeed.code.repository.MessageThreadRepository;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;

@Component
public class AllThreadFetcher implements DataFetcher {

	 @Autowired
	    MessageThreadRepository bookRepository;

	    @Override
	    public List<MessageThread> get(DataFetchingEnvironment dataFetchingEnvironment) {
	        return bookRepository.findByCreatedBy(dataFetchingEnvironment.getArgument("id"));
	    

}
}

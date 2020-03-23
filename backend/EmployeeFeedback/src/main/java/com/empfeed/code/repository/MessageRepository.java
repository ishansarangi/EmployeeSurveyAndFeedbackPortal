package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.empfeed.code.model.entity.Message;

public interface MessageRepository extends CrudRepository<Message, Long> {
	
	@Query("from Message where threadId=:threadId")
	public Iterable<Message> getMessageListForThreadId(@Param("threadId") Long threadId);
	

}

package com.empfeed.code.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.empfeed.code.model.MessageThread;

public interface MessageThreadRepository extends JpaRepository<MessageThread, Integer> {

	
	List<MessageThread> findByCreatedBy(int createdBy);
	
	List<MessageThread> findBySentTo(int createdBy);
	
}

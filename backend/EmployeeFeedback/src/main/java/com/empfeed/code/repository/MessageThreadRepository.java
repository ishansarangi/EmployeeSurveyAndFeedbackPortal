package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.empfeed.code.model.entity.MessageThread;

public interface MessageThreadRepository extends CrudRepository<MessageThread, Long> {
	
	@Query("from MessageThread where createdBy.employeeId=:employeeId")
	public Iterable<MessageThread> findAllSentThreads(@Param("employeeId") Long employeeId);

	@Query("from MessageThread where sentTo.employeeId=:employeeId")
	public Iterable<MessageThread> findAllReceivedThreads(@Param("employeeId") Long employeeId);

}

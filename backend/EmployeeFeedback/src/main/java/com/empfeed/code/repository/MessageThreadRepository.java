package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empfeed.code.model.MessageThread;

public interface MessageThreadRepository extends JpaRepository<MessageThread, Integer> {

}

package com.empfeed.code.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empfeed.code.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

	public List<Message>findByThreadId(int id);
}

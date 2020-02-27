package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empfeed.code.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

}

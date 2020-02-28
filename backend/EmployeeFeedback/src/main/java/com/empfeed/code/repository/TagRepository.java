package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empfeed.code.model.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

}

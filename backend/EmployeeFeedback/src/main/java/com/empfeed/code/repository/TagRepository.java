package com.empfeed.code.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.empfeed.code.model.entity.Tag;

public interface TagRepository extends CrudRepository<Tag, Long> {

	@Query("from Tag where threadId=:threadId")
	public Iterable<Tag> getTagListForThreadId(@Param("threadId") Long threadId);

	@Query(value ="select t from Tag t left join fetch t.messageThread where t.tagId=:tagId")
	public Tag getTagDetails(@Param("tagId") Long tagId);

}
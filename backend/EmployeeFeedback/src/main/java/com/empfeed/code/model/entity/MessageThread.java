/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package com.empfeed.code.model.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table
public @Data class MessageThread {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "thread_id")
	private Long threadId;

	@OneToOne
	private Employee sentTo;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "thread_tag", joinColumns = {
			@JoinColumn(name = "threadId", referencedColumnName = "thread_id") }, inverseJoinColumns = {
					@JoinColumn(name = "tagId", referencedColumnName = "tag_id") })
	private Set<Tag> tags = new HashSet<>();

	private String subject;

	@OrderBy("DESC")
	private Date createdAt;

	private Date modifiedAt;

	private String latestText;

	@OneToOne
	private Employee createdBy;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "readByManagers", joinColumns = @JoinColumn(name = "message_thread_id"))
	private Set<Long> readByManagers = new HashSet<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "readByEmployee", joinColumns = @JoinColumn(name = "message_thread_id"))
	private Set<Long> readByEmployee = new HashSet<>();

	@OneToMany(mappedBy = "messageThread", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@OrderBy("createdAt")
	private Set<Message> messages = new HashSet<>();
}

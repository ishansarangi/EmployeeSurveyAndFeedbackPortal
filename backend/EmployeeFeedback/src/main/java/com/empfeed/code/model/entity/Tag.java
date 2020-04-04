package com.empfeed.code.model.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Setter(value = AccessLevel.PUBLIC)
@Getter
public class Tag {
	@Id
	@Column(name = "tag_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long tagId;

	private String name;

	private String color;

	private Integer totalMessages;

	@OneToOne
	private Employee createdBy;

	@ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
	private Set<MessageThread> messageThread;

}

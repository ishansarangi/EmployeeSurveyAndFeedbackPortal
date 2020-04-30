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

import {gql} from 'apollo-boost';

export const get_threads_for_employee = gql`
  query findAllSentThreads($employeeId: ID!) {
    findAllSentThreads(employeeId: $employeeId) {
      threadId
      sentTo {
        employeeId
        firstName
        lastName
      }
      subject
      createdAt
      modifiedAt
      latestText
      readByEmployee
      createdBy {
        employeeId
        firstName
        lastName
      }
      messages {
        messageId
        text
        createdAt
        messageSender
      }
    }
  }
`;

export const get_threads_for_manager = gql`
  query findAllReceivedThreads($employeeId: ID!) {
    findAllReceivedThreads(employeeId: $employeeId) {
      threadId
      sentTo {
        employeeId
        firstName
        lastName
      }
      subject
      createdAt
      latestText
      modifiedAt
      readByManagers
      messages {
        messageId
        text
        createdAt
        messageSender
      }
      tags {
        tagId
        name
        color
        totalMessages
      }
    }
  }
`;
export const create_new_thread = gql`
  mutation newThread(
    $to_employeeId: Long!
    $subject: String!
    $text: String!
    $from_employeeId: Long!
  ) {
    newThread(
      input: {
        sentTo: $to_employeeId
        subject: $subject
        text: $text
        employeeId: $from_employeeId
      }
    ) {
      threadId
      sentTo {
        employeeId
        firstName
        lastName
      }
      subject
      createdAt
      modifiedAt
      latestText
      createdBy {
        employeeId
        firstName
        lastName
      }
      messages {
        text
        createdAt
        messageSender
      }
    }
  }
`;

export const send_reply_in_thread = gql`
  mutation newMessage($threadId: Long, $text: String, $from_employeeId: Long) {
    newMessage(
      input: {threadId: $threadId, text: $text, employeeId: $from_employeeId}
    ) {
      threadId
      messages {
        text
        createdAt
        messageSender
      }
    }
  }
`;

export const get_all_managers = gql`
  query findAllManagers($employeeId: ID!) {
    findAllManagers(employeeId: $employeeId) {
      employeeId
      firstName
      lastName
    }
  }
`;

export const get_employee = gql`
  query findEmployee($employeeId: ID!) {
    findEmployee(employeeId: $employeeId) {
      employeeId
      firstName
      lastName
    }
  }
`;

export const get_employee_by_email = gql`
  query findEmployeeByEmail($emailId: String!) {
    findEmployeeByEmail(emailId: $emailId) {
      employeeId
      firstName
      lastName
      userType
      email
    }
  }
`;

export const create_new_tag = gql`
  mutation newTag($employeeId: Long!, $name: String, $color: String) {
    newTag(input: {employeeId: $employeeId, name: $name, color: $color}) {
      tagId
      name
      color
      totalMessages
    }
  }
`;

export const add_tags_to_thread = gql`
  mutation addTagToThread($employeeId: Long!, $threadId: Long!, $tagId: Long!) {
    addTagToThread(
      input: {employeeId: $employeeId, threadId: $threadId, tagId: $tagId}
    ) {
      tagId
      color
      name
      totalMessages
    }
  }
`;

export const remove_tag_from_thread = gql`
  mutation removeTagFromThread(
    $employeeId: Long!
    $threadId: Long!
    $tagId: Long!
  ) {
    removeTagFromThread(
      input: {employeeId: $employeeId, threadId: $threadId, tagId: $tagId}
    ) {
      tagId
    }
  }
`;

export const get_all_tags = gql`
  query findAllTags {
    findAllTags {
      tagId
      color
      name
      totalMessages
    }
  }
`;

export const read_message_thread = gql`
  mutation readMessageThread($employeeId: Long!, $threadId: Long!) {
    readMessageThread(employeeId: $employeeId, threadId: $threadId) {
      threadId
    }
  }
`;

export const get_manager_hierarchy = gql`
  query findManagerHierarchy($employeeId: ID!) {
    findManagerHierarchy(employeeId: $employeeId) {
      employeeId
      firstName
      lastName
    }
  }
`;

export const remove_tag = gql`
  mutation removeTag($tagId: ID!) {
    removeTag(tagId: $tagId) {
      tagId
    }
  }
`;

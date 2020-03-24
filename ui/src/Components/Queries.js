import {gql} from 'apollo-boost';

export const get_threads_for_employee = gql`
  query findAllSentThreads($employeeId: Long) {
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
  query findAllReceivedThreads($employeeId: Long) {
    findAllReceivedThreads(employeeId: $employeeId) {
      threadId
      sentTo {
        employeeId
        firstName
        lastName
      }
      subject
      createdAt
      modifiedAt
      messages {
        messageId
        text
        createdAt
        messageSender
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
    }
  }
`;

export const send_reply_in_thread = gql`
  mutation newMessage($threadId: Long, $text: String, $from_employeeId: Long) {
    newMessage(
      input: {threadId: $threadId, text: $text, employeeId: $from_employeeId}
    ) {
      threadId
    }
  }
`;

export const get_all_managers = gql`
  query findAllManagers($employeeId: Long!) {
    findAllManagers(employeeId: $employeeId) {
      employeeId
      firstName
      lastName
    }
  }
`;

export const get_employee = gql`
  query findEmployee($employeeId: Long!) {
    findEmployee(employeeId: $employeeId) {
      employeeId
      firstName
      lastName
    }
  }
`;

import {gql} from 'apollo-boost';

export const get_all_threads_for_employee = gql`
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

export const get_all_threads_for_manager = gql`
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
      modifiedAt
      latestText
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
    $sentTo: Long!
    $subject: String!
    $createdBy: Long!
    $text: String!
  ) {
    newThread(
      sentTo: $sentTo
      subject: $subject
      createdBy: $createdBy
      text: $text
    ) {
      threadId
    }
  }
`;

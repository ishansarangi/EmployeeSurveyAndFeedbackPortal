import {gql} from 'apollo-boost';

export const get_all_employee_threads = gql`
  {
    MessageThread {
      threadId
      subject
      createdBy
      sentTo
      messages {
        messageId
        text
        createdAt
        createdBy
      }
    }
  }
`;

export const get_all_manager_threads = gql`
  {
    MessageThread {
      threadId
      subject
      sentTo
      messages {
        messageId
        text
        createdAt
      }
    }
  }
`;

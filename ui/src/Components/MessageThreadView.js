import React from 'react';
import {all_thread_data} from '../data/TestData';
import Message from './Message';
import TextBox from './TextBox';
import './message.css';
import ChatHeader from './ChatHeader';

const MessageThreadView = ({selectedThread, threadData}) => {
  const createMessageView = () => {
    return threadData.messages.map(msg => {
      return (
        <Message
          msg={msg}
          employee={threadData.createdBy}
          manager={threadData.sentTo}
        />
      );
    });
  };
  const handleSubmit = () => {};
  return (
    <div class="chat-containter">
      <div class="component-header">
        <ChatHeader threadData={threadData} />
      </div>
      <div id="chat" class="chat">
        {createMessageView()}
      </div>
      <div class="component-footer">
        <TextBox handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
MessageThreadView.propTypes = {};
export default MessageThreadView;

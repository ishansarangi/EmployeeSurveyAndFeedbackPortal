import React from 'react';
import {all_thread_data} from '../data/TestData';
import Message from './Message';
import TextBox from './TextBox';
import './message.css';
import ChatHeader from './ChatHeader';

const MessageThreadView = ({selectedThread}) => {
  const createMessageView = () => {
    return all_thread_data[selectedThread].messages.map(msg => {
      return <Message msg={msg} />;
    });
  };
  const handleSubmit = () => {};
  return (
    <div class="chat-containter">
      <div class="component-header">
        <ChatHeader msg={all_thread_data[selectedThread]} />
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

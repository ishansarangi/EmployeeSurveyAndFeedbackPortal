import React, {useState} from 'react';
import {all_thread_data} from '../data/TestData';
import Message from './Message';
import TextBox from './TextBox';
import './message.css';

const MessageThreadView = ({selectedThread}) => {
  const createMessageView = () => {
    return all_thread_data[selectedThread].messages.map(msg => {
      return <Message msg={msg} />;
    });
  };
  const handleSubmit = () => {};
  return (
    <div class="chat-containter">
      <div id="chat" class="chat">
        {createMessageView()}
      </div>
      <div class="message-footer">
        <TextBox handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
MessageThreadView.propTypes = {};
export default MessageThreadView;

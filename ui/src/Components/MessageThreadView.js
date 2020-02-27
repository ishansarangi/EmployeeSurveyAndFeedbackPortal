import React from 'react';
import './message.css';
import TextBox from './TextBox.js';

const MessageThreadView = ({selectedThread}) => {
  const handleSubmit = () => {};
  return (
    <div class="chat-containter">
      <div id="chat" class="chat"></div>
      <TextBox handleSubmit={handleSubmit} />
    </div>
  );
};

MessageThreadView.propTypes = {};

export default MessageThreadView;

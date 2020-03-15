import React from 'react';
import './message.css';

const Message = ({msg}) => {
  if (msg.sentBy === 'You') {
    return (
      <div class="message right">
        <div class="message-text">
          <div class="message-title">{msg.createdAt}</div>
          {msg.text}
        </div>
      </div>
    );
  } else {
    return (
      <div class="message left">
        <div class="message-text">
          <div class="message-title">
            <div>{msg.sentBy}</div>
            <div>{msg.createdAt}</div>
          </div>
          {msg.text}
        </div>
      </div>
    );
  }
};
Message.propTypes = {};
export default Message;

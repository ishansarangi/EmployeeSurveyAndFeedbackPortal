import React from 'react';
import './message.css';

const Message = ({msg}) => {
  if (msg.sentBy === 'You') {
    return (
      <div className="message right">
        <div className="message-text">
          <div className="message-title">{msg.createdAt}</div>
          {msg.text}
        </div>
      </div>
    );
  } else {
    return (
      <div className="message left">
        <div className="message-text">
          <div className="message-title">
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

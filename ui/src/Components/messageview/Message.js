import React from 'react';
import './message.css';
import {FeedbackType} from '../feedback/FeedbackType';

const Message = ({msg, type}) => {
  if (
    (type === FeedbackType.Employee && msg.messageSender === 2) ||
    (type === FeedbackType.Personal && msg.messageSender === 1)
  ) {
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

import React from 'react';
import './message.css';

const Message = ({msg, employee, manager}) => {
  console.log(msg);
  if (msg.messageSender === 1) {
    return (
      <div class="message right">
        <div class="message-text">
          <div class="message-title">
            <div>{manager.firstName}</div>
            <div>{msg.createdAt}</div>
          </div>
          {msg.text}
        </div>
      </div>
    );
  } else {
    return (
      <div class="message left">
        <div class="message-text">
          <div class="message-title">
            <div>{employee.firstName}</div>
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

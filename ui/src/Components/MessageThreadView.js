import React from 'react';
import {all_thread_data} from '../data/TestData';
import Message from './Message';
import TextBox from './TextBox';
import './message.css';
import ChatHeader from './ChatHeader';

const MessageThreadView = props => {
  const createMessageView = () => {
    return all_thread_data[props.selectedThread].messages.map((msg, index) => {
      return <Message key={index} msg={msg} />;
    });
  };
  const handleSubmit = () => {};
  return (
    <div className="chat-containter">
      <div className="component-header">
        <ChatHeader
          msg={all_thread_data[props.selectedThread]}
          feedbackType={props.feedbackType}
        />
      </div>
      <div id="chat" className="chat">
        {createMessageView()}
      </div>
      <div className="component-footer">
        <TextBox handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
MessageThreadView.propTypes = {};
export default MessageThreadView;

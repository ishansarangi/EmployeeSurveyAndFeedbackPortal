import React, {useContext, useState} from 'react';
import {all_thread_data} from '../data/TestData';
import Message from './Message';
import TextBox from './TextBox';
import './message.css';
import ChatHeader from './ChatHeader';
import {send_reply_in_thread} from './Queries';
import {useMutation} from '@apollo/react-hooks';
import {UserContext} from './UserContext';

const MessageThreadView = ({selectedThread, feedbackType}) => {
  const [sendMessage, {data}] = useMutation(send_reply_in_thread);
  const {user} = useContext(UserContext);
  const [text, setText] = useState('');

  const createMessageView = () => {
    return all_thread_data[selectedThread].messages.map((msg, index) => {
      return <Message key={index} msg={msg} />;
    });
  };
  const handleSubmit = () => {
    sendMessage({
      variables: {
        threadId: all_thread_data[selectedThread].threadId,
        from_employeeId: user.employeeId,
        text: text,
      },
    });
  };
  return (
    <div className="chat-containter">
      <div className="component-header">
        <ChatHeader
          msg={all_thread_data[selectedThread]}
          feedbackType={feedbackType}
        />
      </div>
      <div id="chat" className="chat">
        {createMessageView()}
      </div>
      <div className="component-footer">
        <TextBox setText={setText} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};
MessageThreadView.propTypes = {};
export default MessageThreadView;

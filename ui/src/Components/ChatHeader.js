import React from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';
import {FeedbackType} from './FeedbackType';

const ChatHeader = props => {
  const renderRecipient = () => {
    if (props.feedbackType === FeedbackType.Personal) {
      return <ChatHeaderRecipient msg={props.msg} />;
    }
  };

  return (
    <div className="header-container">
      {props.msg.subject}
      {renderRecipient()}
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

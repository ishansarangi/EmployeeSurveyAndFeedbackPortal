import React from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';
import {FeedbackType} from '../feedback/FeedbackType';

const ChatHeader = ({threadData, feedbackType}) => {
  const renderRecipient = () => {
    if (feedbackType === FeedbackType.Personal && threadData) {
      return <ChatHeaderRecipient sentTo={threadData.sentTo} />;
    }
  };

  return (
    <div className="header-container">
      {threadData && threadData.subject ? threadData.subject : ''}
      {renderRecipient()}
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

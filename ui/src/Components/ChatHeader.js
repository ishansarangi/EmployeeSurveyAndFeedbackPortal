import React, {useContext} from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';
import {UserContext} from './UserContext';
import {UserType} from './UserType';
import {FeedbackType} from './FeedbackType';

const ChatHeader = props => {
  const {userType} = useContext(UserContext);
  const renderRecipient = () => {
    if (props.feedbackType === FeedbackType.My) {
      return <ChatHeaderRecipient msg={props.msg} />;
    }
  };

  return (
    <div class="header-container">
      {props.msg.subject}
      {renderRecipient()}
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

import React, {useContext} from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';
import {UserContext} from './UserContext';
import {UserType} from './UserType';

const ChatHeader = ({threadData}) => {
  const {userType} = useContext(UserContext);
  const renderRecipient = () => {
    if (userType === UserType.Employee) {
      return <ChatHeaderRecipient threadData={threadData} />;
    }
  };

  return (
    <div class="header-container">
      {threadData.subject}
      {renderRecipient()}
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

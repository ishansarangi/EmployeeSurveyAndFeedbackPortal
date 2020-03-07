import React, {useContext} from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';
import {UserContext} from './UserContext';
import {UserType} from './UserType';

const ChatHeader = ({msg}) => {
  const {userType} = useContext(UserContext);
  const renderRecipient = () => {
    if (userType === UserType.Employee) {
      return <ChatHeaderRecipient msg={msg} />;
    }
  };

  return (
    <div class="header-container">
      {msg.subject}
      {renderRecipient()}
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

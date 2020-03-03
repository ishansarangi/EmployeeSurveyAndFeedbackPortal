import React from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';

const ChatHeader = ({msg}) => {
  return (
    <div class="header-container">
      {msg.subject}
      <ChatHeaderRecipient msg={msg} />
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

import React from 'react';
import ChatHeaderRecipient from './ChatHeaderRecipient';

const ChatHeader = ({msg}) => {
  return (
    <div class="header-container">
      {msg.subject}
      <div class="component-header">
        <ChatHeaderRecipient msg={msg} />
      </div>
    </div>
  );
};

ChatHeader.propTypes = {};

export default ChatHeader;

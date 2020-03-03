import React from 'react';

const ChatHeader = ({msg}) => {
  return <div class="header-container">{msg.subject}</div>;
};

ChatHeader.propTypes = {};

export default ChatHeader;

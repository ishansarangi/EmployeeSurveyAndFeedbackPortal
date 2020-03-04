import React from 'react';

const ChatHeaderRecipient = ({msg}) => {
  return <div class="header-container-recipient">To: {msg.manager}</div>;
};

ChatHeaderRecipient.propTypes = {};

export default ChatHeaderRecipient;

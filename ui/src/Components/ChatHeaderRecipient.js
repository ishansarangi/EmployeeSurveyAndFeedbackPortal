import React from 'react';

const ChatHeaderRecipient = ({msg}) => {
  return <div className="header-container-recipient">To: {msg.manager}</div>;
};

ChatHeaderRecipient.propTypes = {};

export default ChatHeaderRecipient;

import React from 'react';

const ChatHeaderRecipient = ({sentTo}) => {
  const getFullName = sentTo => {
    if (sentTo) {
      return sentTo.firstName + ' ' + sentTo.lastName;
    }
  };

  return (
    <div className="header-container-recipient">To: {getFullName(sentTo)}</div>
  );
};

ChatHeaderRecipient.propTypes = {};

export default ChatHeaderRecipient;

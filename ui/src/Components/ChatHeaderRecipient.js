import React from 'react';

const ChatHeaderRecipient = ({threadData}) => {
  return (
    <div class="header-container-recipient">
      To: {threadData.sentTo.firstName}
    </div>
  );
};

ChatHeaderRecipient.propTypes = {};

export default ChatHeaderRecipient;

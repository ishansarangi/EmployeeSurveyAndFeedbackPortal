import React, {useRef, useEffect} from 'react';
import MessageItem from './MessageItem';

const ChatBody = ({threadData, feedbackType}) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      console.log(chatBodyRef);
    }
  }, [chatBodyRef, threadData]);

  const createMessageView = () => {
    if (threadData && threadData.messages)
      return threadData.messages.map((msg, index) => {
        return (
          <MessageItem
            key={index}
            createdBy={threadData.createdBy}
            sentTo={threadData.sentTo}
            msg={msg}
            feedbackType={feedbackType}
          />
        );
      });
  };

  return (
    <div id="chat" className="chat" ref={chatBodyRef}>
      {createMessageView()}
    </div>
  );
};

ChatBody.propTypes = {};

export default ChatBody;

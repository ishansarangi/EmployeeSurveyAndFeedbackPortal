/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React, {useRef, useEffect} from 'react';
import MessageItem from './MessageItem';

const ChatBody = ({threadData, feedbackType}) => {
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
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

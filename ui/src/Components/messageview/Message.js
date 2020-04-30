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

import React from 'react';
import './message.css';
import {FeedbackType} from '../feedback/FeedbackType';

const Message = ({msg, type}) => {
  if (
    (type === FeedbackType.Employee && msg.messageSender === 2) ||
    (type === FeedbackType.Personal && msg.messageSender === 1)
  ) {
    return (
      <div className="message right">
        <div className="message-text">
          <div className="message-title">{msg.createdAt}</div>
          {msg.text}
        </div>
      </div>
    );
  } else {
    return (
      <div className="message left">
        <div className="message-text">
          <div className="message-title">
            <div>{msg.sentBy}</div>
            <div>{msg.createdAt}</div>
          </div>
          {msg.text}
        </div>
      </div>
    );
  }
};
Message.propTypes = {};
export default Message;

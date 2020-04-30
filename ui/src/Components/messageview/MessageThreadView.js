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

import React, {useState, Fragment} from 'react';
import MessageItem from './MessageItem';
import TextBox from './TextBox';
import './message.css';
import ChatHeader from './ChatHeader';
import {send_reply_in_thread} from '../apollo/Queries';
import {useMutation} from '@apollo/react-hooks';
import {useAuthUser} from '../auth/AuthUser';
import Typography from '@material-ui/core/Typography';
import {FeedbackType} from '../feedback/FeedbackType';
import {UserType} from '../UserType';
import AddTagToThread from './tags/AddTagToThread';
import {useStoreActions} from 'easy-peasy';
import ChatBody from './ChatBody';

const MessageThreadView = ({
  feedbackType,
  threadData,
  threadCount,
  selectedThread,
}) => {
  const {loggedInUser} = useAuthUser();
  const [text, setText] = useState('');

  const sendMessageToEmployeeThread = useStoreActions(
    (actions) => actions.employeeThreadList.addMessageToThread
  );
  const sendMessageToPersonalThread = useStoreActions(
    (actions) => actions.personalThreadList.addMessageToThread
  );

  const getThreadToBeUpdated = () => {
    if (
      feedbackType === FeedbackType.Employee &&
      loggedInUser.userType === UserType.Manager
    ) {
      return sendMessageToEmployeeThread;
    }
    return sendMessageToPersonalThread;
  };

  const [sendMessage] = useMutation(send_reply_in_thread, {
    onCompleted: (data) => {
      setText('');
      getThreadToBeUpdated()(data.newMessage);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const getHeaderView = () => {
    if (threadData) {
      return <ChatHeader threadData={threadData} feedbackType={feedbackType} />;
    }
  };

  const getFooterView = () => {
    if (threadData && threadData.threadId)
      if (
        feedbackType === FeedbackType.Employee &&
        loggedInUser.userType !== UserType.Employee
      )
        return (
          <div className="component-footer">
            <AddTagToThread threadData={threadData} />
            <TextBox
              text={text}
              setText={setText}
              handleSubmit={handleSubmit}
            />
          </div>
        );
      else {
        return (
          <div className="component-footer">
            <TextBox
              text={text}
              setText={setText}
              handleSubmit={handleSubmit}
            />
          </div>
        );
      }
  };

  const getStaticViews = () => {
    if (threadCount > 0 && selectedThread === -1) {
      return <Typography align="center">Click a message to view.</Typography>;
    } else if (
      feedbackType === FeedbackType.Employee &&
      loggedInUser.userType === UserType.Manager
    ) {
      return (
        <Typography align="center">
          You have no feedback messages. Any anonymous messages from your
          employee can be seen here.
        </Typography>
      );
    } else {
      return (
        <Typography align="center">
          To start an anonymous message to your manager, click the "New Thread"
          button found on the bottom left of the screen.
        </Typography>
      );
    }
  };

  const handleSubmit = () => {
    sendMessage({
      variables: {
        threadId: threadData.threadId,
        from_employeeId: loggedInUser.employeeId,
        text: text,
      },
    });
  };

  const getMessageView = () => {
    if (selectedThread === -1 || threadCount === 0) {
      return (
        <div id="chat" className="chat">
          {getStaticViews()}
        </div>
      );
    } else {
      return (
        <Fragment>
          <div className="component-header">{getHeaderView()}</div>
          <ChatBody threadData={threadData} feedbackType={feedbackType} />
          {getFooterView()}
        </Fragment>
      );
    }
  };

  return <div className="chat-containter">{getMessageView()}</div>;
};

MessageThreadView.propTypes = {};

export default MessageThreadView;

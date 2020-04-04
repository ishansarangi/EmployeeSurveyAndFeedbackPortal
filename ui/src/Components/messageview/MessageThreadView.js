import React, {useState, Fragment} from 'react';
import Message from './Message';
import TextBox from './TextBox';
import './message.css';
import ChatHeader from './ChatHeader';
import {send_reply_in_thread} from '../apollo/Queries';
import {useMutation} from '@apollo/react-hooks';
import {useAuthUser} from '../auth/AuthUser';
import Typography from '@material-ui/core/Typography';
import {FeedbackType} from '../feedback/FeedbackType';
import {UserType} from '../UserType';
import AddTagToThread from './AddTagToThread';
import {useStoreActions} from 'easy-peasy';

const MessageThreadView = ({selectedThread, feedbackType, threadData}) => {
  const {loggedInUser} = useAuthUser();
  const [text, setText] = useState('');

  const sendMessageToEmployeeThread = useStoreActions(
    actions => actions.employeeThreadList.addMessageToThread
  );
  const sendMessageToPersonalThread = useStoreActions(
    actions => actions.personalThreadList.addMessageToThread
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
    onCompleted: data => {
      console.log(data);
      setText('');
      getThreadToBeUpdated()(data.newMessage);
    },
    onError: error => {
      console.log(error);
    },
  });

  const getNoMessageText = () => {
    if (
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

  const createMessageView = () => {
    if (
      threadData &&
      threadData.length &&
      threadData[selectedThread] &&
      threadData[selectedThread].messages
    )
      return threadData[selectedThread].messages.map((msg, index) => {
        return <Message key={index} msg={msg} />;
      });
    else {
      return getNoMessageText();
    }
  };

  const createHeaderView = () => {
    if (threadData && threadData.length) {
      return (
        <ChatHeader
          threadData={threadData[selectedThread]}
          feedbackType={feedbackType}
        />
      );
    }
  };

  const getTextBoxView = () => {
    if (
      threadData &&
      threadData.length &&
      threadData[selectedThread] &&
      threadData[selectedThread].messages
    )
      return (
        <TextBox text={text} setText={setText} handleSubmit={handleSubmit} />
      );
  };

  const getTagPanelView = () => {
    if (
      threadData &&
      threadData.length &&
      threadData[selectedThread] &&
      threadData[selectedThread].threadId &&
      feedbackType === FeedbackType.Employee &&
      loggedInUser.userType !== UserType.Employee
    )
      return <AddTagToThread threadId={threadData[selectedThread].threadId} />;
  };

  const handleSubmit = () => {
    sendMessage({
      variables: {
        threadId: threadData[selectedThread].threadId,
        from_employeeId: loggedInUser.employeeId,
        text: text,
      },
    });
  };

  const getMessageView = () => {
    if (selectedThread === -1 && threadData && threadData.length) {
      return (
        <div id="chat" className="chat">
          <Typography align="center">Click a message to view.</Typography>
        </div>
      );
    } else {
      return (
        <Fragment>
          <div className="component-header">{createHeaderView()}</div>
          <div id="chat" className="chat">
            {createMessageView()}
          </div>
          <div className="component-footer">
            {getTagPanelView()}
            {getTextBoxView()}
          </div>
        </Fragment>
      );
    }
  };

  return <div className="chat-containter">{getMessageView()}</div>;
};

MessageThreadView.propTypes = {};

export default MessageThreadView;

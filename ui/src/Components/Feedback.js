import React from 'react';
import NewThread from './NewThread';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Thread from './Thread';
import Message from './Message';

const Feedback = () => {
  return (
    <SplitterLayout>
      <Thread />
      <Message />
    </SplitterLayout>
  );
};

export default Feedback;

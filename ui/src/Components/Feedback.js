import React, {useState} from 'react';
import NewThread from './NewThread';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';

const Feedback = () => {
  const [selectedThread, setSelectedThread] = useState(0);
  return (
    <SplitterLayout>
      <Thread
        setSelectedThread={setSelectedThread}
        selectedThread={selectedThread}
      />
      <MessageThreadView selectedThread={selectedThread} />
    </SplitterLayout>
  );
};

export default Feedback;

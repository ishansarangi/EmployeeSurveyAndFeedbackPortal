import React, {useState} from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';

const Feedback = () => {
  const [selectedThread, setSelectedThread] = useState(0);
  return (
    <SplitterLayout
      primaryMinSize={400}
      secondaryMinSize={200}
      secondaryInitialSize={1000}
    >
      <div className="thread-pane">
        <Thread
          setSelectedThread={setSelectedThread}
          selectedThread={selectedThread}
        />
      </div>
      <div className="message-pane">
        <MessageThreadView selectedThread={selectedThread} />
      </div>
    </SplitterLayout>
  );
};

export default Feedback;

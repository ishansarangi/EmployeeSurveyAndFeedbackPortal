import React, {useState, useEffect} from 'react';
import 'react-splitter-layout/lib/index.css';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';
import './index.css';
import SplitPane, {Pane} from 'react-split-pane';

const Feedback = () => {
  const [selectedThread, setSelectedThread] = useState(0);
  useEffect(
    () => console.log('selectedThread value changed to = ' + selectedThread),
    [selectedThread]
  );
  return (
    <SplitPane split="vertical">
      <div>
        <Thread setSelectedThread={setSelectedThread} />
      </div>
      <div>
        <MessageThreadView selectedThread={selectedThread} />
      </div>
    </SplitPane>
  );
};

export default Feedback;

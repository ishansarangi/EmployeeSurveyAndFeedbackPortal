import React, {useState} from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Thread from './Thread';
import MessageThreadView from './MessageThreadView';

const Feedback = () => {
  const [selectedThread, setSelectedThread] = useState(0);
  return (
    <div>
      <SplitterLayout percentage={true} primaryMinSize={30}>
        <div>
          <Thread
            setSelectedThread={setSelectedThread}
            selectedThread={selectedThread}
          />
        </div>
        <div>
          <MessageThreadView selectedThread={selectedThread} />
        </div>
      </SplitterLayout>
    </div>
  );
};

export default Feedback;

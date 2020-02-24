import React from 'react';
import NewThread from './NewThread';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const Feedback = () => {
    return (
        <SplitterLayout>

            <div>
                <NewThread/>
            </div>
        </SplitterLayout>

    );
}

export default Feedback;

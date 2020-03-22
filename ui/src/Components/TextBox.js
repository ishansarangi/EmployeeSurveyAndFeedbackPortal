import React from 'react';
import './message.css';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const TextBox = ({handleSubmit}) => {
  return (
    <div class="send-container">
      <TextField
        className="send-input"
        placeholder="Type Something..."
        multiline="true"
        rowsMax={5}
        inputProps={{
          style: {
            padding: 5,
          },
        }}
      />
      <SendIcon style={{color: '#E87424'}}></SendIcon>
    </div>
  );
};
TextBox.propTypes = {};
export default TextBox;

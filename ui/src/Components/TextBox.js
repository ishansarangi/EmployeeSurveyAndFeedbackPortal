import React from 'react';
import './message.css';
import {TextField} from '@material-ui/core';

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
      <input
        type="submit"
        class="send-btn"
        value="Send"
        onClick="handleSubmit"
      />
    </div>
  );
};
TextBox.propTypes = {};
export default TextBox;

import React from 'react';
import PropTypes from 'prop-types';
import './message.css';
const TextBox = ({handleSubmit}) => {
  return (
    <div class="send-container">
      <form id="send">
        <input
          type="text"
          id="msgInput"
          class="send-input"
          placeholder="Message"
        />
        <input
          type="submit"
          class="send-btn"
          value="Send"
          onClick="handleSubmit"
        />
      </form>
    </div>
  );
};
TextBox.propTypes = {};
export default TextBox;
import React from 'react';

const Message = ({msg}) => {
  return (
    <section class={msg.sender}>
      <section class="msgs">
        <p>
          {msg.text}
          <div class="message-time">{msg.createdAt}</div>
        </p>
      </section>
    </section>
  );
};

Message.propTypes = {};

export default Message;

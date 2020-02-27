import React, {useState} from 'react';
import './message.css';
import {all_thread_data} from '../data/TestData';
import Message from './Message';

const MessageThreadView = ({selectedThread}) => {
  const createMessageView = () => {
    return all_thread_data[selectedThread].messages.map(msg => {
      return <Message msg={msg} />;
    });
  };

  return (
    <React.Fragment>
      <div>{createMessageView()}</div>
      {/* <div class="send-container">
        <form id="send">
          <input
            type="text"
            id="msgInput"
            class="send-input"
            placeholder="Message"
          />
          <input type="submit" class="send-btn" value="Send" />
        </form>
      </div> */}
    </React.Fragment>

    // <div>
    //   <section class="them">
    //     <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
    //     <section class="msgs">
    //       <p>
    //         Ichabod, I'm having trouble with these lyrics, can you come over to
    //         help?
    //       </p>
    //     </section>
    //   </section>
    //   <section class="me">
    //     <section class="msgs">
    //       <p>Sure, JJ. Which part are you getting stuck with?</p>
    //     </section>
    //   </section>
    //   <section class="them">
    //     <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
    //     <section class="msgs">
    //       <p>I know what I want to say, but can't get the right onomotopeia</p>
    //     </section>
    //   </section>
    //   <section class="me">
    //     <section class="msgs">
    //       <p>We'll work it out...</p>
    //       <p>Somehow</p>
    //       <p>I'm in love with dat Vicky</p>
    //     </section>
    //   </section>
    //   <section class="them">
    //     <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
    //     <section class="msgs">
    //       <p>You look great in her hair.</p>
    //       <p>I LOLed when you came out.</p>
    //       <p>It was so funny ;)</p>
    //       <p>LOL</p>
    //     </section>
    //   </section>
    //   <section class="me">
    //     <section class="msgs">
    //       <p>Ya, IRK</p>
    //       <p>It was pretty funny, i thought.</p>
    //     </section>
    //   </section>
    // </div>
  );
};

MessageThreadView.propTypes = {};

export default MessageThreadView;

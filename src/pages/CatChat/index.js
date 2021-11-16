import React, { useState, useEffect, useRef } from 'react';
import './CatChat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import CATPHRASES from '../../constants/catPhrases';

function CatChat() {
  const [draftMessage, setDraftMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      alignToTop: true,
      behavior: 'smooth',
    });
  };

  useEffect(scrollToBottom, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageSent = {
      author: 'You',
      message: draftMessage,
      timestamp: new Date().toLocaleTimeString('en-US'),
    };

    setChat((chatHistory) => [...chatHistory, messageSent]);
    setDraftMessage('');

    setTimeout(
      () =>
        setChat((chatHistory) => [
          ...chatHistory,
          {
            author: 'Cat on the Internet',
            message: CATPHRASES[Math.floor(Math.random() * CATPHRASES.length)],
            timestamp: new Date().toLocaleTimeString('en-US'),
          },
        ]),
      2000
    );
  };

  return (
    <div data-testid="cat-chat-page" className="cat-chat-page">
      <div className="cat-chat-header">
        <div>Cat Chat </div>
        <a
          data-testid="cal-github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CalCorbin/cal-portfolio/blob/master/src/pages/CatChat/index.js"
        >
          <FontAwesomeIcon size="sm" icon={faGithub} className="social-icon" />
        </a>
      </div>

      <div className="chat-container">
        <div className="messages">
          {chat.length >= 1 ? (
            chat.map((chatMessage) => (
              <div
                key={`${chatMessage.author}_${chatMessage.timestamp}`}
                className={`message ${
                  chatMessage.author === 'You' ? 'sender' : 'cat'
                }`}
              >
                {chatMessage.message}
                <div>
                  Sent by {chatMessage.author} at {chatMessage.timestamp}
                </div>
              </div>
            ))
          ) : (
            <div>Say something to the cat...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage}>
          <hr />
          <div>
            <input
              type="text"
              value={draftMessage}
              placeholder="Press enter to send..."
              onChange={(e) => setDraftMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CatChat;

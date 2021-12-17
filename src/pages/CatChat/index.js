import React, { useState, useEffect, useRef } from 'react';
import './CatChat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import CATPHRASES from '../../constants/catPhrases';

function randomInt(value) {
  return Math.floor(Math.random() * value);
}

const CatChat = function () {
  const [draftMessage, setDraftMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (!messagesEndRef.current) return;

    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
    let timer;
    if (sending) {
      timer = setTimeout(() => {
        setChat((chatHistory) => [
          ...chatHistory,
          {
            author: 'Cat',
            message: CATPHRASES[randomInt(CATPHRASES.length)],
            timestamp: new Date().toLocaleTimeString('en-US'),
          },
        ]);
      }, 2000);
      setSending(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();

    const messageSent = {
      author: 'You',
      message: draftMessage,
      timestamp: new Date().toLocaleTimeString('en-US'),
    };

    setSending(true);
    setChat((chatHistory) => [...chatHistory, messageSent]);
    setDraftMessage('');
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
            chat.map((chatMessage, index) => (
              <div
                key={`${chatMessage.author}_${randomInt(9000)}`}
                className={`message ${
                  chatMessage.author === 'You' ? 'sender' : 'cat'
                }`}
                data-testid={`${chatMessage.author}-${index}`}
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
              data-testid="chat-input"
            />
            <button
              type="submit"
              disabled={draftMessage.length <= 0}
              data-testid="send-button"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatChat;

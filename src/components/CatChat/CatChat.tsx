import { useState, useEffect, useRef } from 'react';
import CATPHRASES from '../../constants/catPhrases';
import Header from '../../components/Header/Header';
import MetaDataTags from '../MetaDataTags/MetaDataTags';
import PROJECTS from '../../constants/projects';
import styles from './CatChat.module.css';

const catChatData = PROJECTS[4];

interface ChatMessage {
  author: string;
  message: string;
  timestamp: string;
}

function randomInt(value: number) {
  return Math.floor(Math.random() * value);
}

const CatChat = () => {
  const [draftMessage, setDraftMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
    let timer: NodeJS.Timeout;
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

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
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
    <div data-testid="cat-chat-page" className={styles['cat-chat-page']}>
      <MetaDataTags
        title={catChatData.title}
        description={catChatData.description}
        image={catChatData.img}
        url={`https://calcorbin.com${catChatData.link}`}
      />
      <Header
        title="Cat Chat"
        repoLink="https://github.com/CalCorbin/cal-portfolio/blob/main/src/components/CatChat/CatChat.tsx"
      />
      <div className={styles['chat-container']}>
        <div className={styles.messages}>
          {chat.length >= 1 ? (
            chat.map((chatMessage, index) => (
              <div
                key={`${chatMessage.author}_${randomInt(9000)}`}
                className={`${styles.message} ${
                  chatMessage.author === 'You' ? styles.sender : styles.cat
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
          <div className={styles['chat-input']}>
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

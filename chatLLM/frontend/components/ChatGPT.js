import React, { useState } from 'react';

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const handleSendMessage = () => {
    if (currentMessage) {
      const userMessage = { text: currentMessage, isBotMessage: false };
      const botMessage = {
        text: 'Thank you for your message. But I don’t know what to say',
        isBotMessage: true,
        liked: false,
        disliked: false,
      };
      setMessages([...messages, userMessage, botMessage]);
      setCurrentMessage('');
    }
  };

  const handleLike = (index) => {
    if (messages[index].isBotMessage) {
      const updatedMessages = [...messages];
      updatedMessages[index].liked = !updatedMessages[index].liked;
      updatedMessages[index].disliked = false;
      setMessages(updatedMessages);
      setLikeActive(!likeActive);
      setDislikeActive(false);
    }
  };

  const handleDislike = (index) => {
    if (messages[index].isBotMessage) {
      const updatedMessages = [...messages];
      updatedMessages[index].disliked = !updatedMessages[index].disliked;
      updatedMessages[index].liked = false;
      setMessages(updatedMessages);
      setDislikeActive(!dislikeActive);
      setLikeActive(false);
    }
  };

  return (
    <div>
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          margin: 10px;
        }

        .message {
          padding: 10px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .user {
          background-color: #0070f3;
          color: #fff;
          margin: 5px;
        }

        .bot {
          background-color: #f0f0f0;
          color: #000;
          margin: 5px;
        }

        .bot-actions {
          display: flex;
        }

        .like, .dislike {
          margin-left: 5px;
          cursor: pointer;
          background-color: #f0f0f0;
          border: 1px solid blue; /* Обводка остается синей */
        }

        button.active {
          background-color: #ccc; /* Цвет плашки для активных лайков и дизлайков */
        }

        .input-container {
          display: flex;
          margin: 10px;
        }

        input {
          flex: 1;
          padding: 5px;
        }

        button {
          padding: 5px 10px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          cursor: pointer;
        }
      `}</style>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isBotMessage ? 'bot' : 'user'}`}>
            <p>{message.text}</p>
            {message.isBotMessage && (
              <div className="bot-actions">
                <button
                  onClick={() => handleLike(index)}
                  className={`like ${message.liked ? 'active' : ''}`}
                >
                  👍
                </button>
                <button
                  onClick={() => handleDislike(index)}
                  className={`dislike ${message.disliked ? 'active' : ''}`}
                >
                  👎
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatGPT;

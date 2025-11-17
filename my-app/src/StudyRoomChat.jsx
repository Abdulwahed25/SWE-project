import React, { useState, useEffect, useRef } from 'react';

function StudyRoomChat() {
  const [messages, setMessages] = useState([
    { type: 'partner', text: 'what task are you working on?' },
    { type: 'partner', text: 'do you want help?' },
    { type: 'user', text: "no thanks, I'm working on debugging." },
    { type: 'user', text: "I'll join the timer in 10 minutes." },
    {
      type: 'system',
      title: 'Work Stuff',
      link: 'http://teem29.swe363.com',
      tag: 'file'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [pinnedItems, setPinnedItems] = useState([
    { text: 'http://teem29.swe363.com', link: '#' },
    { text: 'Study File: Chapter 5 PDF', link: '#' }
  ]);
  const chatAreaRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  // Scroll helper
  const scrollToBottom = (jump = false) => {
    if (chatAreaRef.current) {
      if (jump) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      } else {
        chatAreaRef.current.scrollTo({
          top: chatAreaRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  // Send message
  const handleSendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages([...messages, { type: 'user', text }]);
    setInputValue('');

    // Simulate a response
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'partner', text: `Got it — "${text}" 👍` }]);
    }, 700);
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Add pinned resource
  const handleAddPinned = () => {
    const newLink = prompt('Enter URL or resource name to pin:');
    if (!newLink) return;
    setPinnedItems([...pinnedItems, { text: newLink, link: '#' }]);
    alert('Pinned resource added.');
  };

  return (
    <div className="chat-container" role="application" aria-label="Study chat room">
      {/* HEADER */}
      <header className="top-header" role="banner">
        <a href="/dashboard" className="back-btn" aria-label="Back to dashboard">←</a>
        <div className="room-name" aria-live="polite">Room Name</div>
        <button
          className="settings-btn"
          id="settings-btn"
          aria-label="Add pinned resource"
          onClick={handleAddPinned}
        >
          ⚙️
        </button>
      </header>

      {/* PINNED LINKS */}
      <section className="pinned-links" id="pinned-links" aria-label="Pinned resources">
        <div className="pinned-row">
          <div className="pinned-title">Pinned Resources</div>
        </div>
        <div className="pinned-row" id="pinned-row-list">
          {pinnedItems.map((item, index) => (
            <a key={index} href={item.link} className="pinned-item" title={item.text}>
              {item.text}
            </a>
          ))}
        </div>
      </section>

      {/* CHAT AREA */}
      <main
        className="chat-area"
        id="chat-area"
        ref={chatAreaRef}
        tabIndex="0"
        aria-label="Messages"
      >
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="bubble">
              {msg.type === 'system' ? (
                <>
                  <strong>{msg.title}</strong>
                  <br />
                  <a href={msg.link} className="file-link">{msg.link}</a>
                  <span className="tag">{msg.tag}</span>
                </>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
      </main>

      {/* INPUT */}
      <div className="input-bar">
        <input
          id="chat-input"
          type="text"
          placeholder="Type a message…"
          aria-label="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="send-btn"
          className="send-btn"
          aria-label="Send"
          onClick={handleSendMessage}
        >
          ↑
        </button>
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
        <button className="nav-icon active" id="nav-chat" title="Chat">💬</button>
        <button className="nav-icon" id="nav-search" title="Search">🔍</button>
        <a className="nav-icon" href="/dashboard" title="Home">🏠</a>
        <a className="nav-icon" href="/profile" title="Profile">👤</a>
        <a className="nav-icon" href="/notifications" title="Notifications">🔔</a>
      </nav>
    </div>
  );
}

export default StudyRoomChat;
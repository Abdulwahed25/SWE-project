  // Elements
    const chatArea = document.getElementById('chat-area');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const pinnedRow = document.getElementById('pinned-row-list');

    // Ensure the chat area starts scrolled to bottom on load
    window.addEventListener('load', () => {
      scrollToBottom(true);
    });

    // Send message
    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
      appendMessage(text, 'user');
      chatInput.value = '';
      scrollToBottom();

      // Example: a simple auto-response after delay
      setTimeout(() => {
        appendMessage(`Got it — "${text}" 👍`, 'partner');
        scrollToBottom();
      }, 700);
    }

    // Append message helper
    function appendMessage(textOrNode, type = 'partner') {
      const wrapper = document.createElement('div');
      wrapper.className = `message ${type}`;

      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      if (typeof textOrNode === 'string') {
        bubble.textContent = textOrNode;
      } else {
        bubble.appendChild(textOrNode);
      }

      wrapper.appendChild(bubble);
      chatArea.appendChild(wrapper);
    }

    // Scroll to bottom helper
    function scrollToBottom(jump = false) {
      // Using scrollTo with behavior smooth can be nicer but can also interrupt fast typing.
      if (jump) {
        chatArea.scrollTop = chatArea.scrollHeight;
      } else {
        // smooth behavior
        chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
      }
    }

    // Events: click / enter key
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    // Settings: add pinned resource
    settingsBtn.addEventListener('click', () => {
      const newLink = prompt('Enter URL or resource name to pin:');
      if (!newLink) return;
      const a = document.createElement('a');
      a.className = 'pinned-item';
      a.href = '#';
      a.title = newLink;
      a.textContent = newLink;
      pinnedRow.appendChild(a);

      // If pinned row grows too large vertically, we still have a fixed pinned height.
      // You can implement a popup or expand action if you want to display many links.
      alert('Pinned resource added.');
    });

    // Small navigation click effects (visual)
    document.querySelectorAll('.nav-icon').forEach(btn => {
      btn.addEventListener('pointerdown', () => btn.classList.add('pressed'));
      btn.addEventListener('pointerup', () => btn.classList.remove('pressed'));
      btn.addEventListener('click', (e) => {
        // toggle "active" only for icon buttons (not links)
        if (btn.tagName === 'BUTTON') {
          document.querySelectorAll('.nav-icon').forEach(n => n.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // Accessibility: focus chat area when using keyboard so arrow keys scroll it
    chatArea.addEventListener('focus', () => {
      // no-op, kept in case we want to announce latest message etc.
    });

    // Optional: handle resizing changes to keep correct scroll (e.g., keyboard on mobile)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        scrollToBottom(true);
      }, 150);
    });
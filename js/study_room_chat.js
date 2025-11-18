  // Elements
    const chatArea = document.getElementById('chat-area');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Settings menu elements
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    const settingsWrap = document.getElementById('settings-wrap');
    const openSettingsBtn = document.getElementById('open-settings-btn');
    const addPinnedBtn = document.getElementById('add-pinned-btn');
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

      // ----------------------------
    // Settings menu behavior
    // ----------------------------
    function openMenu() {
      settingsMenu.setAttribute('aria-hidden', 'false');
      settingsBtn.setAttribute('aria-expanded', 'true');
      // position adjustment if menu would overflow right edge (mobile/desktop)
      // (menu is right-aligned; for narrow screens it should be fine)
    }

    function closeMenu() {
      settingsMenu.setAttribute('aria-hidden', 'true');
      settingsBtn.setAttribute('aria-expanded', 'false');
    }

    // Toggle on click
    settingsBtn.addEventListener('click', (e) => {
      const isHidden = settingsMenu.getAttribute('aria-hidden') === 'true';
      if (isHidden) openMenu();
      else closeMenu();

      // Prevent click from bubbling to document (which would immediately close the menu)
      e.stopPropagation();
    });

    // Option 1: Open Room Settings page
    openSettingsBtn.addEventListener('click', () => {
      closeMenu();
      // Navigate to settings page
      window.location.href = 'room_settings.html';
    });

    // Option 2: Add pinned resource (original behavior)
    addPinnedBtn.addEventListener('click', () => {
      closeMenu();
      const newLink = prompt('Enter URL or resource name to pin:');
      if (!newLink) return;
      const a = document.createElement('a');
      a.className = 'pinned-item';
      a.href = '#';
      a.title = newLink;
      a.textContent = newLink;
      pinnedRow.appendChild(a);
      // Keep user informed
      alert('Pinned resource added.');
    });

    // Click outside closes menu
    document.addEventListener('click', (e) => {
      // If click is inside the settings-wrap, ignore
      if (settingsWrap.contains(e.target)) return;
      closeMenu();
    });

    // Keyboard accessibility: Esc closes the menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
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

  

    // Optional: handle resizing changes to keep correct scroll (e.g., keyboard on mobile)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        scrollToBottom(true);
      }, 150);
    });
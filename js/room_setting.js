  const displayMode = document.getElementById('display-mode');
        const editForm = document.getElementById('edit-form');
        const editDisplayBtn = document.getElementById('edit-display-btn');
        const cancelEditBtn = document.getElementById('cancel-edit-btn');

        // Simulated initial data (as if fetched from database)
        let roomSettings = {
            name: "CS Students",
            description: "Study group for CS courses",
            access: "admins", // 'admins' or 'all'
            privacy: "public" // 'public' or 'private'
        };

        // --- RENDER FUNCTIONS ---
        
        function formatAccess(access) {
            return access === 'admins' ? 'Just Admins' : 'All Members';
        }
        
        function renderDisplay() {
            // Update read-only values
            document.getElementById('current-room-name').textContent = roomSettings.name;
            document.getElementById('display-room-name-val').textContent = roomSettings.name;
            document.getElementById('display-description-val').textContent = roomSettings.description;
            document.getElementById('display-access-val').textContent = formatAccess(roomSettings.access);
            document.getElementById('display-privacy-val').textContent = roomSettings.privacy.charAt(0).toUpperCase() + roomSettings.privacy.slice(1);
            
            // Show display mode, hide edit form
            displayMode.style.display = 'block';
            editForm.style.display = 'none';
        }

        function openEditMode() {
            // Populate form inputs with current data
            document.getElementById('edit-room-name').value = roomSettings.name;
            document.getElementById('edit-description').value = roomSettings.description;
            
            // Set radio button checks based on current state
            document.querySelector(`input[name="edit-access"][value="${roomSettings.access}"]`).checked = true;
            document.querySelector(`input[name="edit-privacy"][value="${roomSettings.privacy}"]`).checked = true;

            // Show edit form, hide display mode
            displayMode.style.display = 'none';
            editForm.style.display = 'block';
        }
        
        function saveSettings(event) {
            event.preventDefault();
            
            const newName = document.getElementById('edit-room-name').value.trim();
            const newDesc = document.getElementById('edit-description').value.trim();
            const newAccess = editForm.elements['edit-access'].value;
            const newPrivacy = editForm.elements['edit-privacy'].value;

            if (newName === '') {
                alert('Room name cannot be empty.');
                return;
            }

            // Update local settings (In a real app, this would be an API call)
            roomSettings.name = newName;
            roomSettings.description = newDesc;
            roomSettings.access = newAccess;
            roomSettings.privacy = newPrivacy;

            alert('Settings saved! (Simulated)');
            renderDisplay(); // Switch back to display mode
        }

        // --- EVENT LISTENERS ---
        editDisplayBtn.addEventListener('click', openEditMode);
        cancelEditBtn.addEventListener('click', renderDisplay);
        editForm.addEventListener('submit', saveSettings);

        // Initialize the page view
        renderDisplay();
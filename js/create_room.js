  const form = document.getElementById('create-room-form');
        const cancelButton = document.getElementById('cancel-btn');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const roomName = document.getElementById('room-name').value.trim();
            const description = document.getElementById('description').value.trim();
            const access = form.elements['access-control'].value;
            const privacy = form.elements['privacy'].value;

            if (roomName === '') {
                alert('Please enter a room name.');
                return;
            }

            // Simulate sending data to a server (or logging for development)
            console.log('Room Data Submitted:');
            console.log({ roomName, description, access, privacy });
            
            alert(`Study Room "${roomName}" successfully created as a ${privacy} room!`);
            
            // Redirect or clear form after submission
            window.location.href = 'study_room_chat.html?room=' + encodeURIComponent(roomName);
        });
        
        cancelButton.addEventListener('click', function() {
            // Optional: Add confirmation before cancelling
            if (confirm("Are you sure you want to cancel room creation?")) {
                window.location.href = 'dashboard.html';
            }
        });
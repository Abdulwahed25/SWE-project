  const editBtn = document.getElementById('edit-btn');
        const cancelBtn = document.getElementById('cancel-btn');
        const displayMode = document.getElementById('display-mode');
        const editForm = document.getElementById('edit-profile-form');
        const saveForm = document.getElementById('edit-profile-form');

        let userData = {
            name: "Mohammed Abdullah",
            phone: "+966 500 050 055",
            email: "mohammed@kfupm.edu.sa",
            gender: "Male",
            dob: "2003-05-11" // YYYY-MM-DD for date input
        };
        
        function renderDisplayMode() {
            document.getElementById('display-name').textContent = userData.name;
            document.getElementById('display-phone').textContent = userData.phone;
            document.getElementById('display-email').textContent = userData.email;
            document.getElementById('display-gender').textContent = userData.gender;
            
            // Format DOB for display (DD-MM-YYYY)
            const [year, month, day] = userData.dob.split('-');
            document.getElementById('display-dob').textContent = `${day}-${month}-${year}`;

            // Switch views
            displayMode.style.display = 'block';
            editForm.style.display = 'none';
        }

        function openEditMode() {
            // Populate form fields with current data
            document.getElementById('input-name').value = userData.name;
            document.getElementById('input-phone').value = userData.phone;
            document.getElementById('input-gender').value = userData.gender;
            document.getElementById('input-dob').value = userData.dob;

            // Switch views
            displayMode.style.display = 'none';
            editForm.style.display = 'block';
        }
        
        function saveProfile(event) {
            event.preventDefault();

            // 1. Collect new data from the form
            const newName = document.getElementById('input-name').value.trim();
            const newPhone = document.getElementById('input-phone').value.trim();
            const newGender = document.getElementById('input-gender').value;
            const newDob = document.getElementById('input-dob').value;
            
            // 2. Update the local userData object (Simulated Save to Database)
            userData.name = newName;
            userData.phone = newPhone;
            userData.gender = newGender;
            userData.dob = newDob;

            // 3. Re-render the display mode
            renderDisplayMode();
        }

        // --- EVENT LISTENERS ---
        editBtn.addEventListener('click', openEditMode);
        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderDisplayMode(); // Just switch back to display mode
        });
        saveForm.addEventListener('submit', saveProfile);

        renderDisplayMode();
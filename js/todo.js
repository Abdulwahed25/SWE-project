  const form = document.getElementById('new-task-form');
        const taskList = document.getElementById('task-list');
        const noteArea = document.getElementById('quick-notes');

        const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
        const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // --- Render Functions ---
        function renderTasks() {
            const tasks = getTasks();
            taskList.innerHTML = ''; // Clear existing list

            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.setAttribute('data-index', index);

                // --- HTML for a Single Task Item ---
                li.innerHTML = `
                    <div class="task-checkbox-wrapper">
                        <span class="task-check-mark">✓</span>
                    </div>
                    <div class="task-details">
                        <p class="task-description">${task.description}</p>
                        ${task.dueDate ? `<span class="task-due-date">due date: ${task.dueDate}</span>` : ''}
                    </div>
                    <button class="delete-btn">X</button>
                `;
                
                taskList.appendChild(li);
            });
            
            // Reattach event listeners to the new elements
            attachEventListeners();
        }
        
        // --- Task Parsing Logic ---
        function parseTaskInput(input) {
            const dateRegex = /(by|due|on)\s*(\w+\s+\d{1,2})|(\w+\s+\d{1,2})$/i;
            const match = input.match(dateRegex);
            
            if (match) {
                let dueDate = match[2] || match[3];
                // Clean the date format if needed (e.g., 'Oct 15')
                
                const description = input.replace(match[0], '').trim();
                return { 
                    description: description || input, 
                    dueDate: dueDate 
                };
            }
            return { description: input, dueDate: null };
        }

        // --- Event Handlers ---
        
        function addTask(event) {
            event.preventDefault();
            const inputField = document.getElementById('new-task-input');
            const inputValue = inputField.value.trim();

            if (inputValue === '') return;

            const { description, dueDate } = parseTaskInput(inputValue);

            const tasks = getTasks();
            tasks.push({
                description,
                dueDate,
                completed: false
            });
            saveTasks(tasks);
            inputField.value = ''; // Clear input
            renderTasks();
        }

        function toggleComplete(e) {
            const wrapper = e.target.closest('.task-checkbox-wrapper');
            if (!wrapper) return;

            const listItem = wrapper.closest('.task-item');
            const index = listItem.getAttribute('data-index');

            const tasks = getTasks();
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        }

        function deleteTask(e) {
            if (!e.target.classList.contains('delete-btn')) return;

            const listItem = e.target.closest('.task-item');
            const index = listItem.getAttribute('data-index');

            const tasks = getTasks();
            tasks.splice(index, 1); // Remove the task at the given index
            saveTasks(tasks);
            renderTasks();
        }
        
        function saveNotes() {
            localStorage.setItem('quickNotes', noteArea.value);
        }

        function loadNotes() {
            noteArea.value = localStorage.getItem('quickNotes') || '';
        }

        function attachEventListeners() {
            // Event delegation for checkbox and delete button
            taskList.addEventListener('click', toggleComplete);
            taskList.addEventListener('click', deleteTask);
        }
        
        // --- Initialization ---
        form.addEventListener('submit', addTask);
        noteArea.addEventListener('input', saveNotes); // Auto-save notes

        loadNotes();
        renderTasks();
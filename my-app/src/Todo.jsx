import React, { useState, useEffect } from 'react';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [quickNotes, setQuickNotes] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedNotes = localStorage.getItem('quickNotes') || '';
    setTasks(savedTasks);
    setQuickNotes(savedNotes);
  }, []);

  // Save tasks to localStorage
  const saveTasks = (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  // Save notes to localStorage
  const saveNotes = (notes) => {
    localStorage.setItem('quickNotes', notes);
    setQuickNotes(notes);
  };

  // Parse task input to extract due date
  const parseTaskInput = (input) => {
    const dateRegex = /(by|due|on)\s*(\w+\s+\d{1,2})|(\w+\s+\d{1,2})$/i;
    const match = input.match(dateRegex);

    if (match) {
      let dueDate = match[2] || match[3];
      const description = input.replace(match[0], '').trim();
      return {
        description: description || input,
        dueDate: dueDate
      };
    }
    return { description: input, dueDate: null };
  };

  // Add new task
  const handleAddTask = (event) => {
    event.preventDefault();
    const inputValue = newTaskInput.trim();

    if (inputValue === '') return;

    const { description, dueDate } = parseTaskInput(inputValue);

    const newTask = {
      description,
      dueDate,
      completed: false
    };

    saveTasks([...tasks, newTask]);
    setNewTaskInput('');
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    saveTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <div className="page-header">
        <a href="/dashboard" className="back-arrow"> &lt; </a>
      </div>

      <h1 className="page-title">My To Do List</h1>

      <form id="new-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          id="new-task-input"
          placeholder="Add a new task (e.g., Study SWE 363 by Oct 20)"
          value={newTaskInput}
          onChange={(e) => setNewTaskInput(e.target.value)}
          required
        />
        <button type="submit" id="add-task-btn">Add</button>
      </form>

      <ul id="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-checkbox-wrapper" onClick={() => toggleComplete(index)}>
              <span className="task-check-mark">✓</span>
            </div>
            <div className="task-details">
              <p className="task-description">{task.description}</p>
              {task.dueDate && <span className="task-due-date">due date: {task.dueDate}</span>}
            </div>
            <button className="delete-btn" onClick={() => deleteTask(index)}>X</button>
          </li>
        ))}
      </ul>

      <div className="notes-section">
        <h2 className="notes-title">Quick Notes</h2>
        <textarea
          id="quick-notes"
          placeholder="Enter your notes here... (Notes save automatically)"
          value={quickNotes}
          onChange={(e) => saveNotes(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Todo;

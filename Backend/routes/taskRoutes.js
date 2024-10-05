// routes/taskRoutes.js
const express = require('express');

const router = express.Router();
const { addTodo , getTodos , updateTodo , deleteTodo} = require('../controllers/todo.controller')

// Create a new task
router.post('/', addTodo);

// Get all tasks
router.get('/', getTodos);

// Update a task (title or completion status)
router.put('/:id', updateTodo);

// Delete a task
router.delete('/:id', deleteTodo );

module.exports = router;

const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz'); // Make sure this path is correct based on your file structure

// POST route to create a new quiz
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Simple validation (optional)
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Create a new quiz
    const newQuiz = await Quiz.create({
      title,
      description,
    });

    res.status(201).json({ quiz: newQuiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to retrieve all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.status(200).json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to retrieve a specific quiz by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ quiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

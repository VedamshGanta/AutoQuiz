const { Quiz } = require('../models');

const generateQuiz = async (req, res) => {
  const { content } = req.body; // Content is the text extracted from the webpage

  // Basic mock quiz generation logic based on content length (example)
  let question = '';
  let options = [];
  let correctAnswer = '';

  // Basic algorithm to generate questions from content length (for now)
  if (content.length < 100) {
    question = 'What is the main topic of this short article?';
    options = ['Topic A', 'Topic B', 'Topic C', 'Topic D'];
    correctAnswer = 'Topic A';
  } else {
    question = 'What are the key points discussed in this article?';
    options = ['Point A', 'Point B', 'Point C', 'Point D'];
    correctAnswer = 'Point B';
  }

  // Save quiz to the database
  const quiz = await Quiz.create({
    question,
    options,
    correctAnswer,
  });

  res.status(201).json(quiz);
};

module.exports = { generateQuiz };

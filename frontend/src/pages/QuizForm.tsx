// src/pages/QuizForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const QuizForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Assuming you have a backend API to handle this request
      await axios.post('/api/quizzes', { title, description });
      // After successful submission, redirect or clear the form
    } catch (error) {
      console.error('Error creating quiz', error);
    }
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Quiz Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quiz description"
          />
        </div>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;

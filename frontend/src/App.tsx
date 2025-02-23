
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizzesPage from './pages/QuizzesPage';  // This is your page to list quizzes
import QuizForm from './pages/QuizForm';        // This is your page to create a new quiz

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>AutoQuiz App</h1>
        <Routes>
          {/* Define the route for the homepage (Quizzes page) */}
          <Route path="/" element={<QuizzesPage />} />
          
          {/* Define the route for the QuizForm page */}
          <Route path="/create" element={<QuizForm />} />
          
          {/* You can add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

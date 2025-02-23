import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizItem from '../components/QuizItem';

interface Quiz {
  id: number;
  title: string;
  description: string;
}

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('/api/quizzes')
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quizzes</h1>
      {quizzes.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <QuizItem key={quiz.id} quiz={quiz} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizzesPage;

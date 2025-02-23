import React from 'react';

interface QuizItemProps {
  quiz: { id: number; title: string };
}

const QuizItem: React.FC<QuizItemProps> = ({ quiz }) => {
  return (
    <li>
      <h3>{quiz.title}</h3>
    </li>
  );
};

export default QuizItem;

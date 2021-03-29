import React from 'react';
import './Circle.scss';
interface CircleProps {
  question: number;
  num: number;
}

export const Circle: React.FC<CircleProps> = ({ question, num }) => {
  return (
    <div className="progress-circle" id="circle" data-progress={num === Infinity ? 0 : num}>
      <span>{question + 1}</span>
    </div>
  );
};

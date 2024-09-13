import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { StackOverflowQuestion } from '../../types/index';

interface QuestionProps {
  questionDetail: StackOverflowQuestion;
}

const Question: React.FC<QuestionProps> = ({ questionDetail }) => {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, [questionDetail]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">{questionDetail.title}</h1>

      <div className="mb-5 text-sm text-gray-600 flex space-x-4">
        <div>Views: {questionDetail.view_count}</div>
        <div>Votes: {questionDetail.score}</div>
        <div>Answers: {questionDetail.answer_count}</div>
        <div>Created: {new Date(questionDetail.creation_date * 1000).toLocaleDateString()}</div>
      </div>

      <div className="mb-5" dangerouslySetInnerHTML={{ __html: questionDetail.body || '' }} />

      <div className="mb-5 flex flex-wrap gap-2">
        {questionDetail.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-200 text-sm font-medium text-gray-700 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mb-10 flex items-center space-x-4">
        <img
          src={questionDetail.owner.profile_image}
          alt={questionDetail.owner.display_name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">{questionDetail.owner.display_name}</p>
          <p className="text-sm text-gray-500">Reputation: {questionDetail.owner.reputation}</p>
        </div>
      </div>
    </div>
  );
};

export default Question;

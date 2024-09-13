import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { StackOverflowAnswer } from '../../types/index';

interface AnswerItemProps {
  index: number;
  style: React.CSSProperties;
  answers: StackOverflowAnswer[];
}

const AnswerItem: React.FC<AnswerItemProps> = ({ index, style, answers }) => {
  const answer = answers[index];

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, [answer.body]);

  const formattedBody = answer.body;

  return (
    <div style={style} className="border border-gray-300 mb-4 rounded-lg bg-gray-50 shadow-sm">
      <div className="max-h-72 overflow-auto p-4">
        <div dangerouslySetInnerHTML={{ __html: formattedBody }} className="prose prose-sm" />
      </div>

      <div className="mt-2 text-right text-sm text-gray-600">
        Score: {answer.score} | {answer.is_accepted ? 'Accepted' : 'Not Accepted'}
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <img
          src={answer.owner.profile_image}
          alt={answer.owner.display_name}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <p className="font-medium text-gray-800">{answer.owner.display_name}</p>
          <p className="text-sm text-gray-500">Reputation: {answer.owner.reputation}</p>
        </div>
      </div>
    </div>
  );
};

export default AnswerItem;

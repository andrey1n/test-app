import React, { useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useSelector, useDispatch } from 'react-redux';
import 'highlight.js/styles/default.css';
import { StackOverflowAnswer } from '../../types';
import AnswerItem from './answer-item';
import { RootState, AppDispatch } from '../../store/index';
import { setSortOrder, setAnswers } from '../../store/slices/answers/answers.slice';

interface AnswersProps {
  answers: StackOverflowAnswer[];
}

const Answers: React.FC<AnswersProps> = ({ answers }) => {
  const dispatch: AppDispatch = useDispatch();
  const { sortOrder, sortedAnswers } = useSelector((state: RootState) => state.answersSort);

  useEffect(() => {
    dispatch(setAnswers(answers));
  }, [answers, dispatch]);

  const itemCount = sortedAnswers.length;
  const itemSize = 400;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Answers</h2>

      <div className="mb-4">
        <label htmlFor="sort-order" className="block text-gray-700 text-sm font-medium mb-1">
          Sort By Reputation:
        </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full"
        >
          <option value="desc">Highest to Lowest</option>
          <option value="asc">Lowest to Highest</option>
        </select>
      </div>

      {itemCount ? (
        <List height={800} itemCount={itemCount} itemSize={itemSize} width="100%">
          {({ index, style }) => <AnswerItem index={index} style={style} answers={sortedAnswers} />}
        </List>
      ) : (
        <div>No answers available.</div>
      )}
    </div>
  );
};

export default Answers;

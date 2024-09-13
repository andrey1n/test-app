import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { setSortOrder } from '../../store/slices/questions/questions.slice';

const QuestionsFilter: React.FC = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: RootState) => state.questions.sortOrder);

  const handleSortChange = (order: 'asc' | 'desc') => {
    dispatch(setSortOrder(order));
  };

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={() => handleSortChange('desc')}
        className={`px-4 py-2 ${
          sortOrder === 'desc' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
        } rounded-l-md border border-gray-300`}
      >
        Newest
      </button>
      <button
        onClick={() => handleSortChange('asc')}
        className={`px-4 py-2 ${
          sortOrder === 'asc' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
        } rounded-r-md border border-gray-300`}
      >
        Oldest
      </button>
    </div>
  );
};

export default QuestionsFilter;

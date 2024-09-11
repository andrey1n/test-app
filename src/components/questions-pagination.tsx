import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCurrentPage } from '../store/slices/questions/questions.slice';

const QuestionsPagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.questions.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.questions.itemsPerPage);
  const questions = useSelector((state: RootState) => state.questions.questions);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const showPagination = questions.length > itemsPerPage;

  return (
    showPagination && (
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md border border-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= questions.length}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md border border-gray-300"
        >
          Next
        </button>
      </div>
    )
  );
};

export default QuestionsPagination;

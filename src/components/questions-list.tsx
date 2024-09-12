import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useSearchQuestionsQuery } from '../utils/api';
import { StackOverflowQuestion } from '../types';
import QuestionsFilter from './questions-filter';
import QuestionsPagination from './questions-pagination';
import { formatDate, sortQuestions, paginateQuestions } from '../store/slices/questions/helper';
import { setQuery, setCurrentPage, setSortOrder } from '../store/slices/questions/questions.slice';
import { useSearchParams } from 'react-router-dom';

const QuestionsList: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useSelector((state: RootState) => state.questions.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.questions.itemsPerPage);
  const query = useSelector((state: RootState) => state.questions.query);
  const sortOrder = useSelector((state: RootState) => state.questions.sortOrder);

  const { data: questions = [], isLoading, isError } = useSearchQuestionsQuery(query);

  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    const sortOrderParam = searchParams.get('sortOrder') || 'desc';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    dispatch(setQuery(queryParam));
    dispatch(setSortOrder(sortOrderParam as 'asc' | 'desc'));
    dispatch(setCurrentPage(pageParam));
  }, [searchParams, dispatch]);

  useEffect(() => {
    setSearchParams({
      query: query,
      sortOrder: sortOrder,
      page: currentPage.toString(),
    });
  }, [query, sortOrder, currentPage, setSearchParams]);

  const sortedQuestions = sortQuestions(questions, sortOrder);
  const currentQuestions = paginateQuestions(sortedQuestions, currentPage, itemsPerPage);

  return (
    <div className="mt-10 mb-10">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching data.</p>
      ) : query.trim() === '' ? (
        <p className="text-center text-gray-500">Please enter a search query.</p>
      ) : (
        <>
          <QuestionsFilter />
          <ul
            role="list"
            className="table w-full border-collapse border border-gray-300 rounded-md"
          >
            {currentQuestions.map((element: StackOverflowQuestion) => (
              <li key={element.question_id} className="table-row hover:bg-gray-50">
                <div className="table-cell p-4 border border-gray-300 align-top w-3/5">
                  <p className="text-base font-semibold text-blue-600 hover:underline">
                    <a href={element.link} target="_blank" rel="noopener noreferrer">
                      {element.title}
                    </a>
                  </p>
                  <div className="mt-2 text-sm text-gray-500 space-x-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded">
                      Answers: {element.answer_count}
                    </span>
                    <span>Views: {element.view_count}</span>
                    <span>Votes: {element.score}</span>
                    <span>Created: {formatDate(element.creation_date)}</span>
                  </div>
                </div>
                <div className="table-cell p-4 border border-gray-300 align-middle w-1/5">
                  <div className="flex flex-wrap gap-2">
                    {element.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-md border border-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="table-cell p-4 border border-gray-300 align-middle w-1/5">
                  <div className="flex items-center gap-3">
                    <img
                      src={element.owner.profile_image}
                      alt={element.owner.display_name}
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <span className="text-sm text-gray-900 font-medium">
                      {element.owner.display_name}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <QuestionsPagination />
        </>
      )}
    </div>
  );
};

export default QuestionsList;

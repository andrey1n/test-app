import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setQuery, setCurrentPage } from '../store/slices/questions/questions.slice';
import { useSearchQuestionsQuery } from '../utils/api';

const SearchForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const query = useSelector((state: RootState) => state.questions.query);

  const { refetch, isFetching } = useSearchQuestionsQuery(query, {
    skip: query.trim() === '',
    refetchOnMountOrArgChange: true,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    refetch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full px-6 py-3 border border-gray-600 rounded-full focus:ring-0 focus:border-gray-400"
            value={query}
            onChange={handleInputChange}
            placeholder="Search questions..."
          />
          <button
            type="submit"
            disabled={isFetching}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-transparent focus:outline-none"
          >
            {isFetching ? (
              'searching...'
            ) : (
              <img
                src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
                alt="Search"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;

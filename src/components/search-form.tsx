import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { setQuery, setCurrentPage } from '../store/slices/questions/questions.slice';
import { useSearchQuestionsQuery } from '../utils/api';
import useDebouncedValue from '../hooks/use-debounce';

const SearchForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const query = useSelector((state: RootState) => state.questions.query);
  const [searchParams, setSearchParams] = useSearchParams();

  const { refetch, isFetching } = useSearchQuestionsQuery(query, {
    skip: query.trim() === '',
    refetchOnMountOrArgChange: true,
  });

  const [inputValue, setInputValue] = useState(searchParams.get('query') || query);
  const debouncedQuery = useDebouncedValue(inputValue, 500);

  
  useEffect(() => {
    const queryParam = searchParams.get('query') || '';
    if (queryParam !== inputValue) {
      setInputValue(queryParam);
      dispatch(setQuery(queryParam));
    }
  }, [searchParams, dispatch]);



  useEffect(() => {
    dispatch(setQuery(debouncedQuery));
    setSearchParams({ query: debouncedQuery });
  }, [debouncedQuery, dispatch, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCurrentPage(1));
    refetch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-3/5 relative">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full px-6 py-3 border border-gray-600 rounded-full focus:ring-0 focus:border-gray-400"
            value={inputValue}
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

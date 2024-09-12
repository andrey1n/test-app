import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setCurrentPage } from '../store/slices/questions/questions.slice';
import { useFetchTagsQuery } from '../utils/api';

const Tags: React.FC = () => {
  const dispatch = useDispatch();

  const { data: tags = [], isLoading, isError } = useFetchTagsQuery();

  const handleTagClick = (tagName: string) => {
    dispatch(setQuery(tagName));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="p-4">
      <h1 className="mb-10 mt-7">Click tags and start exploring!</h1>
      {isLoading && <p>Loading tags...</p>}
      {isError && <p className="text-red-500">Failed to load tags</p>}

      <div className="grid grid-cols-10 gap-2">
        {tags.map((tag) => (
          <div
            key={tag.name}
            className="border p-0 rounded text-center text-xs font-bold cursor-pointer bg-gray-200 hover:bg-gray-300 transition-colors duration-150 ease-in-out"
            style={{ width: '100px', height: '20px' }}
            onClick={() => handleTagClick(tag.name)}
          >
            <span className="truncate">{tag.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;

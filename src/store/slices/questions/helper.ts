import { StackOverflowQuestion } from '../../../types/index';

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

export const sortQuestions = (
  questions: StackOverflowQuestion[],
  sortOrder: 'asc' | 'desc',
): StackOverflowQuestion[] => {
  return [...questions].sort((a, b) => {
    const dateA = new Date(a.creation_date * 1000).getTime();
    const dateB = new Date(b.creation_date * 1000).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const paginateQuestions = (
  questions: StackOverflowQuestion[],
  currentPage: number,
  itemsPerPage: number,
): StackOverflowQuestion[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return questions.slice(startIndex, endIndex);
};

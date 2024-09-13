import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StackOverflowQuestion } from '../../../types/index';
import { stackOverflowApi } from '../../../utils/api';

interface QuestionsState {
  query: string;
  questions: StackOverflowQuestion[];
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  sortOrder: 'asc' | 'desc';
}

const initialState: QuestionsState = {
  query: '',
  questions: [],
  loading: false,
  currentPage: 1,
  itemsPerPage: 10,
  sortOrder: 'desc',
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const sortQuestions = (
  questions: StackOverflowQuestion[],
  sortOrder: 'asc' | 'desc',
): StackOverflowQuestion[] => {
  return [...questions].sort((a, b) => {
    const dateA = new Date(a.creation_date * 1000).getTime();
    const dateB = new Date(b.creation_date * 1000).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

const paginateQuestions = (
  questions: StackOverflowQuestion[],
  currentPage: number,
  itemsPerPage: number,
): StackOverflowQuestion[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return questions.slice(startIndex, endIndex);
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      if (action.payload === '') {
        state.questions = [];
        state.currentPage = 1;
      }
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortOrder(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sortOrder = action.payload;
    },
    setQuestions(state, action: PayloadAction<StackOverflowQuestion[]>) {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(stackOverflowApi.endpoints.searchQuestions.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        stackOverflowApi.endpoints.searchQuestions.matchFulfilled,
        (state, { payload }) => {
          state.questions = sortQuestions(payload, state.sortOrder);
          state.loading = false;
        },
      )
      .addMatcher(stackOverflowApi.endpoints.searchQuestions.matchRejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectSortedAndPaginatedQuestions = (state: { questions: QuestionsState }) => {
  const { questions, currentPage, itemsPerPage, sortOrder } = state.questions;
  const sortedQuestions = sortQuestions(questions, sortOrder);
  return paginateQuestions(sortedQuestions, currentPage, itemsPerPage);
};

export const { setQuery, setCurrentPage, setSortOrder, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;

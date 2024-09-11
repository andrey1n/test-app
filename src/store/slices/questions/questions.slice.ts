import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionsState } from '../../../types/index';
import { stackOverflowApi } from '../../../utils/api';

const initialState: QuestionsState = {
  query: '',
  questions: [],
  loading: false,
  currentPage: 1,
  itemsPerPage: 10,
  sortOrder: 'desc' as 'asc' | 'desc',
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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(stackOverflowApi.endpoints.searchQuestions.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        stackOverflowApi.endpoints.searchQuestions.matchFulfilled,
        (state, { payload }) => {
          state.questions = payload;
          state.loading = false;
        },
      )
      .addMatcher(stackOverflowApi.endpoints.searchQuestions.matchRejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, setCurrentPage, setSortOrder } = questionsSlice.actions;
export default questionsSlice.reducer;

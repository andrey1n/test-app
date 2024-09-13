import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StackOverflowAnswer } from '../../../types/index'; 

type SortOrder = 'asc' | 'desc';

interface AnswerSortState {
  sortOrder: SortOrder;
  sortedAnswers: StackOverflowAnswer[];
}

const initialState: AnswerSortState = {
  sortOrder: 'desc', 
  sortedAnswers: [], 
};

const sortAnswers = (answers: StackOverflowAnswer[], sortOrder: SortOrder) => {
  return [...answers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.owner.reputation - b.owner.reputation;
    } else {
      return b.owner.reputation - a.owner.reputation;
    }
  });
};

const answerSortSlice = createSlice({
  name: 'answerSort',
  initialState,
  reducers: {
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
      state.sortedAnswers = sortAnswers(state.sortedAnswers, state.sortOrder);
    },
    setAnswers(state, action: PayloadAction<StackOverflowAnswer[]>) {
      state.sortedAnswers = sortAnswers(action.payload, state.sortOrder);
    },
  },
});

export const { setSortOrder, setAnswers } = answerSortSlice.actions;
export default answerSortSlice.reducer;

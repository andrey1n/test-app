import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './slices/questions/questions.slice';
import tagsReducer from './slices/tags/tags.slice';
import answersReducer from './slices/answers/answers.slice';
import { stackOverflowApi } from '../utils/api';

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    tags: tagsReducer,
    answersSort: answersReducer,
    [stackOverflowApi.reducerPath]: stackOverflowApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stackOverflowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

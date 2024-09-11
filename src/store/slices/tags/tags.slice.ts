import { createSlice } from '@reduxjs/toolkit';
import { TagsState } from '../../../types';
import { stackOverflowApi } from '../../../utils/api';

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: false,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(stackOverflowApi.endpoints.fetchTags.matchPending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(stackOverflowApi.endpoints.fetchTags.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.tags = payload;
      })
      .addMatcher(stackOverflowApi.endpoints.fetchTags.matchRejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default tagsSlice.reducer;

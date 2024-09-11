import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StackOverflowQuestion, Tag } from '../types/index';

const BASE_URL = 'https://api.stackexchange.com/2.3';
const SITE_PARAM = 'site=stackoverflow';

export const stackOverflowApi = createApi({
  reducerPath: 'stackOverflowApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchTags: builder.query<Tag[], void>({
      query: () => `/tags?${SITE_PARAM}`,
      transformResponse: (response: { items: Tag[] }) => response.items,
    }),

    searchQuestions: builder.query<StackOverflowQuestion[], string>({
      query: (query) => `/search/advanced?order=desc&sort=relevance&${SITE_PARAM}&q=${query}`,
      transformResponse: (response: { items: StackOverflowQuestion[] }) => response.items,
    }),
  }),
});

export const { useFetchTagsQuery, useSearchQuestionsQuery } = stackOverflowApi;

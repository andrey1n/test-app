import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StackOverflowQuestion, StackOverflowAnswer, Tag } from '../types/index';

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
    fetchQuestionById: builder.query<StackOverflowQuestion, string>({
      query: (id) => `/questions/${id}?order=desc&sort=activity&${SITE_PARAM}&filter=withbody`,
      transformResponse: (response: { items: StackOverflowQuestion[] }) => response.items[0],
    }),
    fetchAnswersByQuestionId: builder.query<StackOverflowAnswer[], string>({
      query: (id) =>
        `/questions/${id}/answers?order=desc&sort=activity&${SITE_PARAM}&filter=withbody`, // Запрос на ответы
      transformResponse: (response: { items: StackOverflowAnswer[] }) => response.items,
    }),
  }),
});

export const {
  useFetchTagsQuery,
  useSearchQuestionsQuery,
  useFetchQuestionByIdQuery,
  useFetchAnswersByQuestionIdQuery,
} = stackOverflowApi;

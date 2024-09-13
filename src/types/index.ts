export interface StackOverflowUser {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  accept_rate?: number;
  profile_image: string;
  display_name: string;
  link: string;
}

export interface StackOverflowAnswer {
  answer_id: number;
  body: string;
  score: number;
  is_accepted: boolean;
  owner: StackOverflowUser;
}

export interface StackOverflowQuestion {
  tags: string[];
  owner: StackOverflowUser;
  body: string;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  content_license?: string;
  link: string;
  closed_reason?: string;
  title: string;
  answers?: StackOverflowAnswer[];
}

export interface QuestionsState {
  query: string;
  questions: StackOverflowQuestion[];
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  sortOrder: 'asc' | 'desc';
}

export interface Tag {
  name: string;
  count: number;
  is_moderator_only: boolean;
  is_required: boolean;
}

export interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: boolean;
}

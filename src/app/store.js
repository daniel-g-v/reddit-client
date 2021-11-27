import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/Posts/postsSlice';
import subredditsReducer from '../features/subredditsSlice';
import searchReducer from '../features/SearchBar/searchBarSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subredditsReducer,
    search: searchReducer
  },
});

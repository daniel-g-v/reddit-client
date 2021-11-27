import { createSlice } from "@reduxjs/toolkit";

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subreddit: ''
    },
    reducers: {
        changeSubreddit: (state, action) => {
            state.subreddit = action.payload;
        }
    }
})

export const { changeSubreddit } = subredditsSlice.actions;
export default subredditsSlice.reducer;
export const selectSubreddit = (state) => state.subreddits.subreddit;
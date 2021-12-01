import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (subreddit) => {
        const response = await fetch(`https://www.reddit.com/${subreddit}.json`);
        const json = await response.json();
        return json;
    }
);

export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async (permalink) => {
        const response = await fetch(`https://www.reddit.com${permalink}.json`);
        const json = await response.json();
        return json
    }
)

const postSlice = createSlice({
    name: 'posts',

    initialState: {
        posts: [],
        isLoading: false,
        rejected: false,
        isLoadingComments: false,
        comments: [],
    },

    reducers: {
        removeComments: (state) => {
            state.comments = [];
        }
    },

    extraReducers: (builder) => {
        builder 
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.rejected = false;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                let children = action.payload.data.children;       
                state.posts = children;
                state.isLoading = false;
                state.rejected = false
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.rejected = true;
            })
            .addCase(fetchComments.pending, (state => {
                state.isLoadingComments = true;
            }))
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoadingComments = false;
                state.comments = action.payload[1].data.children;    
            })
            .addCase(fetchComments.rejected, (state) => {
                state.isLoadingComments = false;
            })
    }

});

export const { removeComments, setExpanded, createExpandedInstance } = postSlice.actions;
export default postSlice.reducer;
export const selectPosts = (state) => state.posts.posts;
export const isLoading = (state) => state.posts.isLoading;
export const isLoadingComments = (state) => state.posts.isLoadingComments;
export const selectComments = (state) => state.posts.comments;

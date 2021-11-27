import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        setSearchTerm: (state, action) => {
            state = action.payload;
        }
    }
});

export const { setSearchTerm } = searchBarSlice.actions;
export default searchBarSlice.reducer;
export const selectSearchTerm = (state) => state.search;
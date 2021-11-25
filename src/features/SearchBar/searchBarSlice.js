import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
    name: 'search',
    initialState: {
        searchTerm: ''
    }
})
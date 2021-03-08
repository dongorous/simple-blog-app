import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

export const fetchAll = createAsyncThunk('posts/fetchAll', async () => {
    const { data } = await api.fetchPosts();
    return data;
});

export const getPost = createAsyncThunk('posts/getPost', async (id) => {
    const { data } = await api.getPost(id);
    return data;
});

export const createPost = createAsyncThunk('posts/createPost', async (param) => {
    const { data } = await api.createPost(param);
    return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await api.deletePost(id);
    return id;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (param) => {
    const { data } = await api.updatePost(param.id, param);
    return data;
});

export const PostsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        filteredResults: [],
        singlePost: {},
        status: null, // status for data fetching
        deletePostStatus: null, 
        createPostStatus: null,
        updatePostStatus: null,
        currentPage: 1,
        postsPerPage: 3,
        totalPosts: 0
    },
    reducers: {
        resetCreateStatus (state) {
            state.createPostStatus = null;
        },
        resetDeleteStatus (state) {
            state.deletePostStatus = null;
        },
        resetUpdateStatus (state) {
            state.updatePostStatus = null;
        },
        resetSinglePost (state) {
            state.singlePost = {};
        },
        filterPost(state, action) {
            let indexOfLastPost = state.currentPage * state.postsPerPage;
            let indexOfFirstPost = indexOfLastPost - state.postsPerPage;
            console.log(indexOfLastPost, "indexOfLastPost")
            console.log(indexOfFirstPost, "indexOfFirstPost")
            state.filteredResults = [...action.payload].slice(indexOfFirstPost, indexOfLastPost);
            state.totalPosts = action.payload.length;
        },
        setCurrentPage(state, action) {
            console.log(action, "setCurrentPage")
            state.currentPage = action.payload;
        },
        setTotalPosts(state, action) {
            state.totalPosts = action.payload;
        },
    },
    extraReducers: {
        [fetchAll.pending]: (state, action) => {    
            state.status = 'loading';
        },
        [fetchAll.fulfilled]: (state, action) => {   
            let indexOfLastPost = state.currentPage * state.postsPerPage;
            let indexOfFirstPost = indexOfLastPost - state.postsPerPage;

            state.status = null;
            state.data = action.payload;
            state.filteredResults = action.payload.slice(indexOfFirstPost, indexOfLastPost);
            state.totalPosts = state.data.length;
        },
        [fetchAll.rejected]: (state, action) => {    
            state.status = 'failed'
        },
        
        // get single post
        [getPost.pending]: (state, action) => {    
            state.status = 'loading-single-post'; // loading singple post
        },
        [getPost.fulfilled]: (state, action) => {    
            state.status = null;
            state.singlePost = action.payload;
        },
        [getPost.rejected]: (state, action) => {    
            state.status = 'failed'
        },
        
        // create new post
        [createPost.pending]: (state, action) => {    
            state.status = 'loading';
        },
        [createPost.fulfilled]: (state, action) => {  
            state.status = null;
            state.data.push(action.payload);
            state.filteredResults = [...state.data];
            state.createPostStatus = true;
        },
        [createPost.rejected]: (state, action) => {    
            state.status = 'failed';
        },

        // delete post
        [deletePost.pending]: (state, action) => {    
            state.status = 'deleting';
        },
        [deletePost.fulfilled]: (state, action) => {  
            state.status = null;
            state.deletePostStatus = true;
            state.data = state.data.filter((post) => post._id !== action.payload);
            state.filteredResults = [...state.data];
        },
        [deletePost.rejected]: (state, action) => {    
            state.status = 'failed';
        },

        // update post
        [updatePost.pending]: (state, action) => {    
            state.status = 'updating';
        },
        [updatePost.fulfilled]: (state, action) => {  
            state.status = null;
            state.updatePostStatus = true;
            // state.filteredResults = [...state.data];
        },
        [updatePost.rejected]: (state, action) => {    
            state.status = 'failed';
        },
    }
})

// Action creators are generated for each case reducer function
export default PostsSlice.reducer;

export const { 
    resetCreateStatus, 
    resetDeleteStatus, 
    resetSinglePost, 
    resetUpdateStatus, 
    filterPost, 
    setCurrentPage,
    setTotalPosts 
} = PostsSlice.actions;
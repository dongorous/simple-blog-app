import { configureStore } from '@reduxjs/toolkit';
import PostsSlice from './components/Posts/PostsSlice';

export default configureStore({
    reducer: {
        PostsSlice
    }
});
import axios from 'axios'

const url = `https://jsonbox.io/box_${process.env.REACT_APP_JSONBOX_API}/posts`;

export const fetchPosts = () => axios.get(url);
export const getPost = (id) => axios.get(`${url}/${id}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const updatePost = (id, editPost) => axios.put(`${url}/${id}`, editPost);
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPosts: [],
  newPost: null,
  selectedPost: null,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setUserPosts: (state, action) => ({ ...state, userPosts: action.payload }),
  }
});

export default postSlice.reducer;
export const {setUserPosts} = postSlice.actions;

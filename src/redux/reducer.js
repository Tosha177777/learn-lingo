import { createSlice } from '@reduxjs/toolkit';
import {
  LoginThunk,
  getAllTeachersThunk,
  registerThunk,
} from './operations.js';

const INITIAL_STATE = {
  allTeachers: [],
  user: {
    email: null,
  },
  isSignedIn: false,
  isLoading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: 'teachers',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(getAllTeachersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTeachers = action.payload;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isSignedIn = true;
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isSignedIn = true;
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const catalogReducer = catalogSlice.reducer;

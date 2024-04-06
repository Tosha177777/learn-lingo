import { createSlice } from '@reduxjs/toolkit';
import {
  LoginThunk,
  LogoutThunk,
  getAllTeachersThunk,
  registerThunk,
} from './operations.js';

const INITIAL_STATE = {
  favs: [],
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
  reducers: {
    toggleFavourite: (state, action) => {
      const avatar_url = action.payload;
      const index = state.favs.findIndex(fav => fav === avatar_url);
      if (index !== -1) {
        state.favs = state.favs.filter(fav => fav !== avatar_url);
      } else {
        state.favs.push(action.payload);
      }
    },
  },
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
      .addCase(LogoutThunk.fulfilled, () => {
        return INITIAL_STATE;
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

export const { toggleFavourite } = catalogSlice.actions;

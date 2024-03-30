import { createSlice } from '@reduxjs/toolkit';
import { getAllTeachersThunk } from './operations.js';

const INITIAL_STATE = {
  allTeachers: [],
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

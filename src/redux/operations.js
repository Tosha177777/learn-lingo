import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTeachers } from '../api';

const getAllTeachersThunk = createAsyncThunk(
  'teachers/getAll',
  async (db, thunkAPI) => {
    try {
      const response = await getAllTeachers(db);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllTeachersThunk };

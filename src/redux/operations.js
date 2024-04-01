import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTeachers } from '../api';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

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

//----------------Auth--------------------//

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ authFB, formData }, thunkAPI) => {
    try {
      const auth = getAuth(authFB);
      const regData = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = regData.user;
      return { token: user.refreshToken, user: { email: user.email } };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllTeachersThunk };

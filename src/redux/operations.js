import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTeachers, getTeachers } from '../api';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

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

export const getStartTeachersThunk = createAsyncThunk(
  'teachers/getStart',
  async (db, thunkAPI) => {
    try {
      const response = await getTeachers(db);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMoreTeachersThunk = createAsyncThunk(
  'teachers/loadMore',
  async ({ db, lastKey }, thunkAPI) => {
    try {
      const response = await getTeachers(db, lastKey);
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

export const LoginThunk = createAsyncThunk(
  'auth/login',
  async ({ authFB, formData }, thunkAPI) => {
    try {
      const auth = getAuth(authFB);
      const logData = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = logData.user;
      return { token: user.refreshToken, user: { email: user.email } };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const LogoutThunk = createAsyncThunk(
  'auth/logout',
  async (authFB, thunkAPI) => {
    try {
      await signOut(authFB);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllTeachersThunk };

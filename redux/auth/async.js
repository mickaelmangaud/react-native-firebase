import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoader, hideLoader } from '../ui/slice';
import { setUser, setError, clearUser } from './slice';
import firebase from 'firebase/app';
import 'firebase/firestore';

const wait = (ms) => new Promise(res => setTimeout(res, ms));

export const registerUserWithFirebase = createAsyncThunk(
  'auth/registerUserWithFirebase',
  async ({email, password, name}, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoader());
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({ name, email });
    } catch(e) {
      thunkAPI.dispatch(setError(e.message));
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
)

export const loginUserWithFirebase = createAsyncThunk(
  'auth/loginUserWithFirebase',
  async ({email, password}, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoader());
      await firebase.auth().signInWithEmailAndPassword(email, password);
      await wait(800);
    } catch(e) {
      thunkAPI.dispatch(setError(e.message));
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const logoutUserFromFirebase = createAsyncThunk(
  'auth/logoutUserFromFirebase',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoader())
    try {
      await firebase.auth().signOut();
      thunkAPI.dispatch(clearUser());
      await wait(800);
    } catch(e) {
      thunkAPI.dispatch(setError(e.message));
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

export const getFirebaseUser = createAsyncThunk(
  'auth/getFirebaseUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoader())
    try {
      const user = await firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        if (user.exists) {
          thunkAPI.dispatch(setUser({
            id: user.id,
            ...user.data(),
          }));
        }
      await wait(800);
    } catch(e) {
      thunkAPI.dispatch(setError(e.message))
    } finally {
      thunkAPI.dispatch(hideLoader())
    }
  }
)
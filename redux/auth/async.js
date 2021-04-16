import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { setLoader, hideLoader } from '../ui/slice';
import { setUser, setError, clearUser } from './slice';

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

      thunkAPI.dispatch(setUser({
        name,
        email,
        id: firebase.auth().currentUser.uid
      }));
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
      
      thunkAPI.dispatch(setUser({
        email,
        name: firebase.auth().currentUser.name,
        id: firebase.auth().currentUser.uid
      }));
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
    } catch(e) {
      thunkAPI.dispatch(setError(e.message));
    } finally {
      thunkAPI.dispatch(hideLoader());
    }
  }
);

// export const getFirebaseUser = createAsyncThunk(
//   'auth/getFirebaseUser',
//   async (_, thunkAPI) => {
//     thunkAPI.dispatch(setLoader())
//     try {
//       const res = firebase.auth().currentUser;
//       thunkAPI.dispatch(setUser({
//         email: res.email,
//         name: res.name
//       }))
//     } catch(e) {
//       console.log('FIREBASE GET USER ERROR', e);
//       thunkAPI.dispatch(setError(e.message))
//     } finally {
//       thunkAPI.dispatch(hideLoader())
//     }
//   }
// )
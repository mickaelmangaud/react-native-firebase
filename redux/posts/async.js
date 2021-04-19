import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserPosts } from './slice';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

export const savePostInFirebase = createAsyncThunk(
  'post/savePostImage',
  async ({imageURI, caption}, thunkAPI) => {
    // thunkAPI.dispatch(setLoader());
    try {
      const response = await fetch(imageURI);
      const blob = await response.blob();
  
      const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
      const task = firebase.storage().ref().child(childPath).put(blob);
  
      const taskProgress = snapshot => console.log(`tranferred: ${snapshot.bytesTransferred}`)
      const taskError = snapshot => console.log(snapshot);

      const taskCompleted = async () => {
        const downloadURL = await task.snapshot.ref.getDownloadURL();
        await firebase.firestore()
          .collection('posts')
          .doc(firebase.auth().currentUser.uid)
          .collection('userPosts')
          .add({
            downloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
          });
      }
  
      task.on('state_changed', taskProgress, taskError, taskCompleted);

    } catch(e) {
      console.log(e);
    } finally {
      // thunkAPI.dispatch(hideLoader());
    }
  }
)

export const fetchUserPosts = createAsyncThunk(
  'post/fetchUserPosts',
  async (_, thunkAPI) => {
    console.log('fetchUserPosts')
    try {
      const snapshot = await firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get();
        
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('fetchUserPosts posts', posts);
        thunkAPI.dispatch(setUserPosts(posts));
    } catch(e) {
      console.log(e)
    }
    
  }
)
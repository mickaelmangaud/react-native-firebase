import React, { useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';
import { Layout } from '../../components';

import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');


export default function Save({ route, navigation }) {
  const [caption, setCaption] = useState('');

  const savePostData = (downloadURL) => {
    console.log('SAVE POST DATA', downloadURL)
    firebase.firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function() {
        console.log('THEN')
        navigation.popToTop()
      })
      .error(err => console.log(err))
  }

  const uploadImage = async () => {
    const response = await fetch(route.params.image);
    const blob = await response.blob();

    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = snapshot => {
      console.log(`tranferred: ${snapshot.bytesTransferred}`)
    }

    const taskCompleted = () => {
      console.log('TASK COMPLETED')
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        savePostData(downloadURL);
        console.log(downloadURL);
      })
    }

    const taskError = snapshot => {
      console.log(snapshot);
    }

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  }

  return (
    <Layout>
      <Image source={{uri: route.params.image }} style={{flex: 1}} />
      <TextInput placeholder="Titre" onChangeText={txt => setCaption(txt)} />
      <Button title='Save' onPress={uploadImage}/>
    </Layout>
  )
}

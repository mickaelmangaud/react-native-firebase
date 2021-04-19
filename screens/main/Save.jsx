import React, { useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';
import { Layout } from '../../components';
import { useDispatch } from 'react-redux';
import { savePostInFirebase } from '../../redux/posts'

export default function Save({ route, navigation }) {
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();

  const savePost = () => {
    dispatch(savePostInFirebase({
      imageURI: route.params.image,
      caption
    }));
    navigation.popToTop();
  }

  return (
    <Layout>
      <Image source={{uri: route.params.image }} style={{flex: 1}} />
      <TextInput placeholder="Titre" onChangeText={txt => setCaption(txt)} />
      <Button title='Save' onPress={savePost}/>
    </Layout>
  )
}

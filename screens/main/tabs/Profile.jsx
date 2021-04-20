import React from 'react';
import { Text, Button, View, StyleSheet, FlatList, Image } from 'react-native';
import { logoutUserFromFirebase } from '../../../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../../components';

export default function Profile() {
  const dispatch = useDispatch();
  const { userPosts } = useSelector(state => state.post);
  const { user } = useSelector(state => state.auth);
  const logout = () => dispatch(logoutUserFromFirebase());

  console.log('userPosts', userPosts);
  
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <View style={StyleSheet.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image 
                source={{ uri: item.downloadURL }}
                style={styles.image}
              />
            </View>
          )}
        />
      </View>
      <Button title="logout" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },  
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage:{
    flex: 1/3
  },
  image: {
    flex: 1,
    aspectRatio: 1/1
  }
});

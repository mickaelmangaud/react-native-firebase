import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { registerUserWithFirebase } from '../../redux/auth/async';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const register = async () => {
    dispatch(registerUserWithFirebase({email, password, name}));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Password"
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Name"
        onChangeText={txt => setName(txt)}
      />
      <Button
        title="Register"
        onPress={register}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

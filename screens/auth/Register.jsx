import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserWithFirebase, setError } from '../../redux/auth';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const register = async () => {
    if (!email || !password) {
      dispatch(setError('Email and password required'))
    } else {
      dispatch(registerUserWithFirebase({email, password, name}));
    }
  };

  const navigateToLogin = () => {
    dispatch(setError(null));
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
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
      <Button onPress={navigateToLogin} title="I want to Login"/>
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

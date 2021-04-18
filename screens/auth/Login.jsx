import React from 'react';
import { useState } from 'react';
import { TextInput, Button, Text } from 'react-native';
import { loginUserWithFirebase, setError } from '../../redux/auth/';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../components';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const login = () => {
    if (!email ||!password) {
      dispatch(setError('Email and password required'));
    } else {
      dispatch(loginUserWithFirebase({email, password}));
    }
  }

  const navigateToRegister = () => {
    dispatch(setError(null));
    navigation.navigate('Register')
  }

  return (
    <Layout>
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" onChangeText={t => setEmail(t)}/>
      <TextInput 
        placeholder="Password"
        secureTextEntry
        onChangeText={t => setPassword(t)}
      />
      <Button title="LOGIN" onPress={login}/>
      <Button onPress={navigateToRegister} title="I don't have an account"/>
    </Layout>
  )
}

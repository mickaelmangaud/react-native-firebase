import React from 'react';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { loginUserWithFirebase } from '../../redux/auth/async';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth)

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <TextInput placeholder="Email" onChangeText={(txt) => setEmail(txt)}/>
      <TextInput 
        placeholder="Password"
        secureTextEntry
        onChangeText={(txt) => setPassword(txt)}
      />
      <Button title="LOGIN" onPress={() => dispatch(loginUserWithFirebase({email, password}))}/>
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

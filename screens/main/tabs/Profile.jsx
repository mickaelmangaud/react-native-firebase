import React from 'react';
import { Text, Button } from 'react-native';
import { logoutUserFromFirebase } from '../../../redux/auth';
import { useDispatch } from 'react-redux';
import { Layout } from '../../../components';

export default function Settings() {
  const dispatch = useDispatch();
  const logout = () => dispatch(logoutUserFromFirebase());

  return (
    <Layout>
      <Text>Home</Text>
      <Button title="Logout" onPress={logout} />
    </Layout>
  )
}

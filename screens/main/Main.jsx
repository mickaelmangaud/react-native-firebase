import React, { useEffect } from 'react';
import { Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserFromFirebase, getFirebaseUser } from '../../redux/auth';
import { Layout } from '../../components';

export default function Main() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFirebaseUser());
  }, [])

  return (
    <Layout>
      {user && <Text>LoggedIn as {user.email}</Text>}
      <Button 
        title="LOGOUT"
        onPress={() => dispatch(logoutUserFromFirebase())}
      />
    </Layout>
  )
}
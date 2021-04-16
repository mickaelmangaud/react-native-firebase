import React from 'react';
import { View, Button, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { logoutUserFromFirebase } from '../../redux/auth/async';
import { useDispatch } from 'react-redux';

export default function Main() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <View>
      {user && <Text>LoggedIn as {user.email}</Text>}
      <Button 
        title="LOGOUT"
        onPress={() => dispatch(logoutUserFromFirebase())}
      />
    </View>
  )
}
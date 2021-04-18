import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Register, Login, Main } from './screens';
import store from './redux';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBt8kXLo_P2GymUxY6pTJg8vI5_Bb3NdFQ",
  authDomain: "instagram-clone-505d2.firebaseapp.com",
  projectId: "instagram-clone-505d2",
  storageBucket: "instagram-clone-505d2.appspot.com",
  messagingSenderId: "594930228280",
  appId: "1:594930228280:web:8224bae18ae0211c411acd"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });
  }, [])

  if (loading) {
    return (
      <View>
        <Text>LOADING ...</Text>
      </View>
    )
  }

  if (!loggedIn) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack.Navigator
            initialRouteName="Login"
          >
            <AuthStack.Screen name="Register" component={Register}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen name="Login" component={Login}
              options={{ headerShown: false }}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

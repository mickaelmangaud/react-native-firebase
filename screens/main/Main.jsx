import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native'
import { getFirebaseUser } from '../../redux/auth';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Home from './tabs/Home';
import Feed from './tabs/Feed';
import Messages from './tabs/Messages';
import Settings from './tabs/Settings';
import Add from './Add';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator()

const Empty = () => <View></View>

const TabNavigator = () =>
  <Tab.Navigator
    tabBarPosition='bottom'
    tabBarOptions={{
      showLabel: false,
      showIcon: true
    }}
  >
    <Tab.Screen 
      name="Home"
      component={Home}
      options={{
        tabBarIcon: () => <MaterialCommunityIcons name="home" color="#222" size={24}/>
      }}
    />
    <Tab.Screen
      name="Feed"
      component={Feed}
      options={{
        tabBarIcon: () => <MaterialCommunityIcons name="home" color="#222" size={24}/>
      }}
    />
    <Tab.Screen
      name="Plus"
      component={Empty}
      listeners={({ navigation }) => ({
        tabPress: (event) => {
          event.preventDefault();
          navigation.navigate('Add');
        }
      })}
      options={{
        tabBarIcon: () => <MaterialCommunityIcons name="plus-box" color="#222" size={24}/>
      }}
    />
    <Tab.Screen
      name="Messages"
      component={Messages}
      options={{
        tabBarIcon: () => <MaterialCommunityIcons name="home" color="#222" size={24}/>
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: () => <MaterialCommunityIcons name="home" color="#222" size={24}/>
      }}
    />
  </Tab.Navigator>

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFirebaseUser());
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Add" component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
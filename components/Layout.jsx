import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Layout({ children}) {
  const { loading } = useSelector(state => state.ui);
  
  if (loading) {
    return  (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
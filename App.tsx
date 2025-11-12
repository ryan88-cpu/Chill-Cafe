import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';
import FlashMessage from 'react-native-flash-message';
import './src/config/Firebase'
export default function App() {
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

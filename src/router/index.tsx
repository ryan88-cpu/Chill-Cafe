import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pages from '../pages'; // default import from pages index

const { SplashScreen, SignIn, SignUp, Home, Menu } = Pages;
const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pages from '../pages'; 

const { SplashScreen, SignIn, SignUp, Home, Menu, Checkout, Payment, Confirm } = Pages;
const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
}
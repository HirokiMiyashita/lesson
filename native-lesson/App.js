import 'react-native-gesture-handler';
import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen,SettingsScreen,SignInScreen,SignUpScreen} from './template/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [isSignedIn,setisSignedIn] = useState("false")
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={SignInScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
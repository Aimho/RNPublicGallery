import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import MainTabScreen from './MainTabScreen';

import {useUserContext} from '../context/UserContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user} = useUserContext();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="MainTab"
          component={MainTabScreen}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;

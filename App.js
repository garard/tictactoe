import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Rules, Credits, Home, LoadGame, useGameLogic} from './src/Index'

const Stack = createStackNavigator()

export default function App() {
  const gameLogic = useGameLogic();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Rules"
          component={Rules}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Credits"
          component={Credits}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoadGame"
          component={LoadGame}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
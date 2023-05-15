import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import TabNavigator from './TabNavigator';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 255, 255)',
    background: 'transparent',
  },
  metric: {
    padding: 16, // TODO
  },
};

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'TabBar'}
      component={TabNavigator}
      options={({}) => ({
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

function Container() {
  return (
    <NavigationContainer
      theme={MyTheme}
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}>
      <AppStack />
    </NavigationContainer>
  );
}

export default Container;

import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

function Navigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={'TabBar'}
          component={TabNavigator}
          options={({}) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

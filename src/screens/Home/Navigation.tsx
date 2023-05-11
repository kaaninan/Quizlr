/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Following from './Following';
import ForYou from './ForYou';
import Header from './components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const HomeStack = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <LinearGradient colors={['#001D28', '#00425A']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HomeStack.Navigator tabBar={props => <Header {...props} />}>
        <HomeStack.Screen name="Following" component={Following} />
        <HomeStack.Screen name="For You" component={ForYou} />
      </HomeStack.Navigator>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

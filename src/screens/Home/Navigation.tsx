/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import Following from './Following';
import ForYou from './ForYou';
import Listening from './components/Listening';
import Header from './components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeStack = createBottomTabNavigator();

export default function Navigation() {
  return (
    <LinearGradient colors={['#001D28', '#00425A']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HomeStack.Navigator
        screenOptions={{headerShown: false}}
        tabBar={props => <Header {...props} />}>
        <HomeStack.Screen name="Following" component={Following} />
        <HomeStack.Screen name="ForYou" component={ForYou} />
      </HomeStack.Navigator>
      <Listening text="Playlist - Unit 5: Period 5: 1844-1877" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

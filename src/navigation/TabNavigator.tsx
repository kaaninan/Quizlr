/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Home from '../screens/Home';
import Activity from '../screens/Activity';
import Bookmarks from '../screens/Bookmarks';
import Discover from '../screens/Discover';
import Profile from '../screens/Profile';

import ActivityIcon from '../assets/vector/menu/activity.svg';
import BookmarksIcon from '../assets/vector/menu/bookmark.svg';
import DiscoverIcon from '../assets/vector/menu/discover.svg';
import HomeIcon from '../assets/vector/menu/home.svg';
import ProfileIcon from '../assets/vector/menu/profile.svg';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = (
                <HomeIcon fill={'white'} fillOpacity={focused ? 1 : 0.4} />
              );
              break;

            case 'Activity':
              icon = (
                <ActivityIcon fill={'white'} fillOpacity={focused ? 1 : 0.4} />
              );
              break;

            case 'Bookmarks':
              icon = (
                <BookmarksIcon fill={'white'} fillOpacity={focused ? 1 : 0.4} />
              );
              break;

            case 'Discover':
              icon = (
                <DiscoverIcon fill={'white'} fillOpacity={focused ? 1 : 0.4} />
              );
              break;

            case 'Profile':
              icon = (
                <ProfileIcon fill={'white'} fillOpacity={focused ? 1 : 0.4} />
              );
              break;

            default:
              break;
          }
          return icon;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 10,
          paddingBottom: 6,
        },
        tabBarStyle: {
          height:
            Platform.OS === 'android'
              ? useSafeAreaInsets().bottom + 60
              : useSafeAreaInsets().bottom + 55,
          backgroundColor: '#011E29',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Bookmarks" component={Bookmarks} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

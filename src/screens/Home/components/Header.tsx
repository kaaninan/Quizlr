import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import ClockIcon from '../../../assets/vector/clock.svg';
import SearchIcon from '../../../assets/vector/search.svg';

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
};

const Header = (props: Props) => {
  // Calculate Position for Tab Bar Line
  const tabOnePos = Dimensions.get('window').width / 2 - 15 - 45;
  const tabTwoPos = Dimensions.get('window').width / 2 - 15 + 45;
  const offset = useSharedValue(tabOnePos);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      left: withTiming(offset.value),
    };
  });
  let currentRoute = props.state.routes[props.state.index].name;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: useSafeAreaInsets().top + 10,
          height: useSafeAreaInsets().top + 45,
        },
      ]}>
      <View style={styles.timeContainer}>
        <ClockIcon />
        <Text style={styles.timeText}>10m</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            offset.value = tabOnePos;
            props.navigation.jumpTo('Following');
          }}>
          <Text
            style={[
              styles.text,
              currentRoute === 'Following' ? styles.bold : null,
            ]}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            // 1 and 10
            offset.value = tabTwoPos;
            props.navigation.jumpTo('ForYou');
          }}>
          <Text
            style={[
              styles.text,
              currentRoute === 'ForYou' ? styles.bold : null,
            ]}>
            For You
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.line,
          animatedStyles,
          {top: useSafeAreaInsets().top + 40},
        ]}
      />
      <View style={styles.searchContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchButtonContainer}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, .6)',
    marginLeft: 5,
    paddingTop: 1,
  },
  menu: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 3,
    fontSize: 18,
    color: 'white',
    width: 90,
    textAlign: 'center',
  },
  bold: {
    fontWeight: '700',
  },
  line: {
    width: 30,
    height: 4,
    backgroundColor: 'white',
    position: 'absolute',
  },
  searchContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  searchButtonContainer: {
    margin: -16,
    padding: 16,
  },
});

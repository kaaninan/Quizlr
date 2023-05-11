import {
  Dimensions,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ClockIcon from '../../../assets/vector/clock.svg';
import SearchIcon from '../../../assets/vector/search.svg';

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
};

const Header = (props: Props) => {
  // Calculate Position for Tab Bar Line
  const tabOnePos = (Dimensions.get('window').width - 30) / 2 - 45;
  const tabTwoPos = (Dimensions.get('window').width - 30) / 2 + 45;

  const renderLine = () => {
    const inputRange = props.state.routes.map((_, i) => i);
    const left = props.position.interpolate({
      inputRange,
      outputRange: [tabOnePos, tabTwoPos],
    });
    return (
      <Animated.View
        style={[
          styles.line,
          // animatedStyles,
          {transform: [{translateX: left}]},
          // left,
          {top: useSafeAreaInsets().top + 40},
        ]}
      />
    );
  };

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
        {props.state.routes.map(
          (
            route: {key: string | number; name: any},
            index: any,
          ): React.JSX.Element => {
            const {options} = props.descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = props.state.index === index;

            const onPress = () => {
              const event = props.navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                props.navigation.navigate({name: route.name, merge: true});
              }
            };

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                onPress={onPress}>
                <Text style={[styles.text, isFocused ? styles.bold : null]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>

      {renderLine()}

      <View style={styles.searchContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.searchButtonContainer}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
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
    fontFamily: 'SF Pro Rounded',
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
    fontFamily: 'SF Pro Rounded',
  },
  bold: {
    fontWeight: '700',
  },
  line: {
    width: 30,
    height: 4,
    backgroundColor: 'white',
    position: 'absolute',
    transform: [{translateX: 100}],
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

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Listening from './Listening';
import SideMenu from './SideMenu';

type Props = {
  id: number;
  description: string;
  flashcard_back: string;
  flashcard_front: string;
  playlist: string;
  type: string;
  user: {
    avatar: string;
    name: string;
  };
};

const Flashcard = (props: Props) => {
  const spin = useSharedValue<number>(0);
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: 500}),
        },
      ],
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: 500}),
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={[styles.front, frontAnimatedStyle]}>
          <TouchableOpacity
            style={styles.containerFront}
            onPress={() => (spin.value = spin.value ? 0 : 1)}>
            <View style={styles.frontTextContainer}>
              <Text style={styles.frontText}>{props.flashcard_front} </Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>{props.user.name} </Text>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionSub}>
                  {props.description.split('#')[0]}{' '}
                </Text>
                <Text style={[styles.descriptionSub, styles.bold]}>
                  #{props.description.split('#')[1]}{' '}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[styles.back, backAnimatedStyle]}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => (spin.value = spin.value ? 0 : 1)}>
            <Text>Back View</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.sideContainer}>
        <SideMenu avatar={props.user.avatar} />
      </View>
      <Listening text={props.playlist} />
    </View>
  );
};

export default Flashcard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  front: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
  },
  containerFront: {
    flex: 1,
  },
  frontTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  frontText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '400',
    fontFamily: 'SF Pro Rounded',
    lineHeight: 25.06,
    paddingLeft: 16,
    paddingRight: 80,
  },
  description: {
    marginRight: 70,
    padding: 16,
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'SF Pro Rounded',
    color: '#fff',
    marginBottom: 6,
    // flexWrap: 'wrap',
  },
  descriptionSub: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'SF Pro Rounded',
    color: '#fff',
    // flexWrap: 'wrap',
    // flex: 1,
  },
  bold: {
    fontWeight: '700',
  },

  back: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: 'hidden',
  },

  sideContainer: {
    position: 'absolute',
    bottom: 36,
    right: 0,
  },
});

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Listening from './Listening';
import SideMenu from './SideMenu';
import Rating from './Rating';

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
  loadQuestion: () => void;
};

const Flashcard = (props: Props) => {
  const first = useSharedValue<number>(0);
  const spin = useSharedValue<number>(0);
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: 500}),
        },
      ],
      zIndex: spin.value ? 0 : 1,
    };
  }, []);

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, {duration: 500}, () => {
            console.log('spin.value', spin.value, first.value);
            if (first.value === 1 && spin.value === 0) {
              runOnJS(props.loadQuestion)();
            }
          }),
        },
      ],
      zIndex: spin.value ? 1 : 0,
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={[styles.front, frontAnimatedStyle]}>
          <View style={styles.container}>
            <Pressable
              style={styles.containerFront}
              onPress={() => {
                first.value = 1;
                spin.value = spin.value ? 0 : 1;
              }}>
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
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View style={[styles.back, backAnimatedStyle]}>
          <Pressable
            onPress={() => {
              spin.value = spin.value ? 0 : 1;
            }}>
            <View style={styles.backTextContainer}>
              <Text style={styles.backText}>{props.flashcard_front} </Text>
            </View>

            <View style={styles.backLine} />

            <Text style={styles.textAnswer}>Answer</Text>
          </Pressable>

          <ScrollView
            style={{marginBottom: 8}}
            contentContainerStyle={{flexGrow: 1}}>
            <Pressable
              style={{flex: 1}}
              onPress={() => {
                spin.value = spin.value ? 0 : 1;
              }}>
              <Text style={styles.textAnswerBig}>{props.flashcard_back}</Text>
            </Pressable>
          </ScrollView>

          <Rating />

          <Pressable
            style={[styles.description, {marginTop: 24}]}
            onPress={() => {
              spin.value = spin.value ? 0 : 1;
            }}>
            <Text style={styles.descriptionTitle}>{props.user.name} </Text>

            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionSub}>
                {props.description.split('#')[0]}{' '}
              </Text>

              <Text style={[styles.descriptionSub, styles.bold]}>
                #{props.description.split('#')[1]}{' '}
              </Text>
            </View>
          </Pressable>
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
    zIndex: 1,
  },
  containerFront: {
    flex: 1,
    // paddingHorizontal: 16,
    // marginRight: 64,
    paddingLeft: 16,
    paddingRight: 80,
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
  },
  description: {
    paddingBottom: 16,
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
    zIndex: -1,
    marginLeft: 16,
    marginRight: 80,
  },

  backTextContainer: {
    justifyContent: 'center',
    marginTop: 16,
  },
  backText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '400',
    fontFamily: 'SF Pro Rounded',
  },

  backLine: {
    backgroundColor: '#fff',
    opacity: 0.2,
    height: 2,
    marginVertical: 24,
  },

  textAnswer: {
    fontWeight: '800',
    fontFamily: 'SF Pro Rounded',
    fontSize: 13,
    color: '#2DC59F',
    marginBottom: 4,
  },
  textAnswerBig: {
    // flex: 1,
    fontWeight: '400',
    fontFamily: 'SF Pro Rounded',
    color: '#fff',
    opacity: 0.8,
    // backgroundColor: '#2DC59F',
    fontSize: 21,
  },

  sideContainer: {
    position: 'absolute',
    bottom: 36,
    right: 0,
  },
});

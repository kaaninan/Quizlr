import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedStyleProp} from 'react-native-reanimated';

type Props = {};

type BoxProps = {
  index: number;
  text: string;
  color: string;
  onPress: (index: number) => void;
};

const Box = (props: BoxProps) => {
  return (
    <TouchableOpacity
      style={[styles.boxContainerPressable, {backgroundColor: props.color}]}
      activeOpacity={0.8}
      onPress={() => props.onPress(props.index)}>
      <Text style={styles.boxText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const Rating = (props: Props) => {
  let [selectedRating, setSelectedRating] = React.useState<number>(0);

  let marginWidth = useSharedValue<number>(8);
  let marginViewStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(marginWidth.value, {duration: 250}),
    };
  }, []);

  let opacity: {value: number}[] = [];
  opacity[0] = useSharedValue<number>(1);
  opacity[1] = useSharedValue<number>(1);
  opacity[2] = useSharedValue<number>(1);
  opacity[3] = useSharedValue<number>(1);
  opacity[4] = useSharedValue<number>(1);

  //   Create boxStyle array for using useAnimatedStyle
  let boxStyle: AnimatedStyleProp<ViewStyle>[] = [];
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    boxStyle[i] = useAnimatedStyle(() => {
      const opacityVal = interpolate(opacity[i].value, [0, 1], [0, 1]);
      const flex = interpolate(opacity[i].value, [0, 1], [0, 1]);
      return {
        opacity: withTiming(opacityVal, {duration: 250}),
        flex: withTiming(flex, {duration: 400}),
      };
    }, []);
  }

  let selectValue = (index: number) => {
    if (selectedRating === index + 1) {
      marginWidth.value = 8;
      for (let i = 0; i < 5; i++) {
        opacity[i].value = 1;
      }
      setSelectedRating(0);
    } else {
      marginWidth.value = 0;
      for (let i = 0; i < 5; i++) {
        opacity[i].value = 0;
      }
      opacity[index].value = 1;
      setSelectedRating(index + 1);
    }
  };

  return (
    <View>
      <Text style={styles.text}>How well did you know this?</Text>
      <View style={styles.boxRow}>
        <Animated.View style={[boxStyle[0], styles.boxContainer]}>
          <Box index={0} text="1" color="#F17D23" onPress={selectValue} />
        </Animated.View>
        <Animated.View style={[marginViewStyle]} />
        <Animated.View style={[boxStyle[1], styles.boxContainer]}>
          <Box index={1} text="2" color="#FBB668" onPress={selectValue} />
        </Animated.View>
        <Animated.View style={[marginViewStyle]} />
        <Animated.View style={[boxStyle[2], styles.boxContainer]}>
          <Box index={2} text="3" color="#FFD449" onPress={selectValue} />
        </Animated.View>
        <Animated.View style={[marginViewStyle]} />
        <Animated.View style={[boxStyle[3], styles.boxContainer]}>
          <Box index={3} text="4" color="#16624F" onPress={selectValue} />
        </Animated.View>
        <Animated.View style={[marginViewStyle]} />
        <Animated.View style={[boxStyle[4], styles.boxContainer]}>
          <Box index={4} text="5" color="#1F8A70" onPress={selectValue} />
        </Animated.View>
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SF Pro Rounded',
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    opacity: 0.6,
    marginBottom: 5,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight: -8,
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  boxContainerPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  boxText: {
    fontFamily: 'SF Pro Rounded',
    fontWeight: '600',
    color: '#fff',
    fontSize: 17,
    paddingVertical: 16,
  },
});

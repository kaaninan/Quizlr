import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import ArrowRightIcon from '../../../assets/vector/arrow-right.svg';
import VideoIcon from '../../../assets/vector/video.svg';

type Props = {
  text: string;
};

const Listening = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <VideoIcon />
      <Text style={styles.text}>{props.text}</Text>
      <ArrowRightIcon />
    </TouchableOpacity>
  );
};

export default Listening;

const styles = StyleSheet.create({
  container: {
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
    fontSize: 13,
    flex: 1,
    marginLeft: 4,
  },
});

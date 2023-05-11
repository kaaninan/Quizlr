import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// useTheme
import {useTheme} from '@react-navigation/native';

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Following = (props: Props) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {marginTop: useSafeAreaInsets().top + 50}]}>
      <Text style={{color: colors.primary}}>KAAN INAN</Text>
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

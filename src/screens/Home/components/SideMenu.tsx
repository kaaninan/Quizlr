import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import LikeIcon from '../../../assets/vector/like.svg';
import CommentIcon from '../../../assets/vector/comment.svg';
import ShareIcon from '../../../assets/vector/share.svg';
import BookmarkIcon from '../../../assets/vector/bookmark.svg';
import FlipIcon from '../../../assets/vector/flip.svg';

type Props = {
  avatar: string;
};

type SideProps = {
  id: number;
  number?: number;
  text?: string;
  svg: any;
};

let List: Array<SideProps> = [
  {
    id: 1,
    number: 87,
    svg: <LikeIcon />,
  },
  {
    id: 2,
    number: 2,
    svg: <CommentIcon />,
  },
  {
    id: 3,
    number: 17,
    svg: <ShareIcon />,
  },
  {
    id: 4,
    number: 203,
    svg: <BookmarkIcon />,
  },
  {
    id: 5,
    text: 'Flip',
    svg: <FlipIcon />,
  },
];

const SideItem = (props: SideProps) => {
  return (
    <TouchableOpacity style={styles.sideItem} activeOpacity={0.6}>
      {props.svg}
      <Text style={styles.sideItemText}>
        {props.number ? props.number : props.text}
      </Text>
    </TouchableOpacity>
  );
};

const SideMenu = (props: Props) => {
  console.log(props.avatar);

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6}>
        <Image style={styles.avatar} source={{uri: props.avatar}} />
      </TouchableOpacity>
      {List.map(item => (
        <SideItem
          key={item.id}
          id={item.id}
          number={item.number}
          text={item.text}
          svg={item.svg}
        />
      ))}
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    marginBottom: 27,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 45,
  },
  sideItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  sideItemText: {
    color: 'white',
    fontFamily: 'SF Pro Rounded',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 7,
  },
});

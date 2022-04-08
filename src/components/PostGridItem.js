import React from 'react';
import {StyleSheet, useWindowDimensions, Image, Pressable} from 'react-native';

function PostGridItem({post}) {
  const dimensions = useWindowDimensions();
  // 한 열에 3개의 컴포넌트가 보이게 함
  const size = (dimensions.width - 3) / 3;

  const onPress = () => {
    // Todo: 단일 포스트 조회 화면 띄우기
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {opacity: pressed ? 0.6 : 1, width: size, height: size},
        styles.block,
      ]}>
      <Image
        style={styles.image}
        source={{uri: post.photoURL}}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
}

export default PostGridItem;

const styles = StyleSheet.create({
  block: {margin: 0.5},
  image: {backgroundColor: '#bdbdbd', width: '100%', height: '100%'},
});

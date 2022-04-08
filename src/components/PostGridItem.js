import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, useWindowDimensions, Image, Pressable} from 'react-native';

function PostGridItem({post}) {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  // 한 열에 3개의 컴포넌트가 보이게 함
  const size = (dimensions.width - 3) / 3;

  const onPress = () => {
    navigation.navigate('Post', {post});
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

import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import Avatar from './Avatar';

function PostCard({user, photoURL, description, createdAt, id}) {
  const navigation = useNavigation();

  const date = useMemo(
    () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
    [createdAt],
  );

  const onOpenProfile = () => {
    navigation.navigate('Profile', {
      userId: user.id,
      displayName: user.displayName,
    });
  };

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} />
          <Text style={styles.displayName}>{user.displayName}</Text>
        </Pressable>
      </View>

      <Image
        source={{uri: photoURL}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.paddingBlock}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date} date={date}>
          {date.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

export default PostCard;

const styles = StyleSheet.create({
  block: {paddingVertical: 16},
  paddingBlock: {paddingHorizontal: 16},
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {flexDirection: 'row', alignItems: 'center'},
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  description: {fontSize: 16, lineHeight: 24, marginBottom: 8},
  date: {color: '#757575', fontSize: 12, lineHeight: 18},
});

import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import events from '../lib/events';

function PostScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {post} = route.params || {};

  useEffect(() => {
    const handler = ({description}) => {
      navigation.setParams({post: {...post, description}});
    };

    events.addListener('updatePost', handler);
    return () => {
      events.removeListener('updatePost', handler);
    };
  }, [post, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard {...post} />
    </ScrollView>
  );
}

export default PostScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },
});

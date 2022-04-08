import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';

function PostScreen() {
  const route = useRoute();
  const {post} = route.params || {};

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

import React, {useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import events from '../lib/events';
import usePosts from '../hooks/usePosts';

import PostCard from '../components/PostCard';

const renderItem = ({item}) => (
  <PostCard
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
    description={item.description}
    createdAt={item.createdAt}
  />
);

function FeedScreen() {
  const {posts, removePost, noMorePost, refreshing, onLoadMore, onRefresh} =
    usePosts();

  useEffect(() => {
    events.addListener('refresh', onRefresh);
    events.addListener('removePost', removePost);
    return () => {
      events.removeListener('refresh', onRefresh);
      events.removeListener('removePost', removePost);
    };
  }, [onRefresh, removePost]);

  const ListFooterComponent = () =>
    !noMorePost && (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={<ListFooterComponent />}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});

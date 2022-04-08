import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import {getPosts, getOlderPosts, getNewerPosts, PAGE_SIZE} from '../lib/posts';

import PostCard from '../components/PostCard';

const renderItem = ({item}) => <PostCard {...item} />;

function FeedScreen() {
  const [posts, setPosts] = useState([]);
  // 마지막 포스트까지 조회했음을 명시하는 상태
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefresing] = useState(false);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const onRefresh = async () => {
    if (!posts || posts.length == 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefresing(true);
    const newerPosts = await getNewerPosts(firstPost.id);
    setRefresing(false);
    if (newerPosts.length === 0) {
      return;
    }

    setPosts(newerPosts.concat(posts));
  };

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }

    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id);
    setPosts(posts.concat(olderPosts));
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
  };

  const ListFooterComponent = () => {
    if (noMorePost) {
      return null;
    }
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  };

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

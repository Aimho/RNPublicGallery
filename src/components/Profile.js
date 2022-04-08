import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import events from '../lib/events';
import {getUser} from '../lib/users';
import usePosts from '../hooks/usePosts';
import {useUserContext} from '../context/UserContext';

import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

const renderItem = ({item}) => <PostGridItem post={item} />;

function Profile({userId}) {
  const [user, setUser] = useState(null);
  const {posts, removePost, noMorePost, refreshing, onLoadMore, onRefresh} =
    usePosts(userId);

  const {user: me} = useUserContext();
  const isMyProfile = me.id === userId;

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  useEffect(() => {
    // 자신의 프로필을 보고 있을 때만 새 포스트 작성 후 새로고침
    if (!isMyProfile) {
      return;
    }

    events.addListener('refresh', onRefresh);
    events.addListener('removePost', removePost);
    return () => {
      events.removeListener('refresh', onRefresh);
      events.removeListener('removePost', removePost);
    };
  }, [isMyProfile, onRefresh, removePost]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  const ListHeaderComponent = () => (
    <View style={styles.userInfo}>
      <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
      <Text style={styles.username}>{user.displayName}</Text>
    </View>
  );

  const ListFooterComponent = () =>
    !noMorePost && (
      <ActivityIndicator
        style={styles.bottomSpinner}
        size={32}
        color="#6200ee"
      />
    );

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      // FlatList의 numColumns는 앱을 리로드해야 반영됨
      numColumns={3}
      keyExtractor={item => item.id}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
      ListHeaderComponent={<ListHeaderComponent />}
      ListFooterComponent={<ListFooterComponent />}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

export default Profile;

const styles = StyleSheet.create({
  block: {flex: 1},
  userInfo: {paddingTop: 80, paddingBottom: 64, alignItems: 'center'},
  username: {marginTop: 8, fontSize: 24, color: '#424242'},
  spinner: {flex: 1, justifyContent: 'center'},
  bottomSpinner: {height: 128},
});

import {useEffect, useState, useCallback} from 'react';

import {useUserContext} from '../context/UserContext';
import usePostsEventEffect from './usePostsEventEffect';
import {getNewerPosts, getOlderPosts, getPosts, PAGE_SIZE} from '../lib/posts';

function usePosts(userId) {
  const {user} = useUserContext();
  const [posts, setPosts] = useState(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const removePost = useCallback(
    postId => {
      setPosts(posts.filter(post => post.id !== postId));
    },
    [posts],
  );

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }

    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id, userId);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }

    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = useCallback(async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id, userId);
    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }

    setPosts(newerPosts.concat(posts));
  }, [posts, userId, refreshing]);

  useEffect(() => {
    getPosts({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_SIZE) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  usePostsEventEffect({
    refresh: onRefresh,
    removePost,
    enabled: !userId || userId === user.id,
  });

  return {
    posts,
    noMorePost,
    onLoadMore,
    refreshing,
    onRefresh,
  };
}

export default usePosts;

import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import Profile from '../components/Profile';
import {useUserContext} from '../context/UserContext';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}

export default MyProfileScreen;

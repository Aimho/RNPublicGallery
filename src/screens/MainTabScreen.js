import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../context/UserContext';

function MainTabScreen() {
  const {user} = useUserContext();

  return (
    <View style={styles.block}>
      {user.photoURL && (
        <Image
          source={{uri: user.photoURL}}
          style={styles.profile}
          resizeMode="cover"
        />
      )}

      <Text style={styles.text}>Hello, {user.displayName}</Text>
    </View>
  );
}

export default MainTabScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  profile: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
});

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  Platform,
  Pressable,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useNavigation, useRoute} from '@react-navigation/native';

import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';

import {useUserContext} from '../context/UserContext';

import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';

function SetupProfile() {
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [displayName, setDisplayName] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const {params} = useRoute();
  const {uid} = params || {};

  const isAndroid = Platform.OS === 'android';

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        // Google Photo를 사용하는 기기의 경우 권한 오류가 발생할 수 있어서
        // android는 base64로 인코딩하도록 설정
        includeBase64: isAndroid,
      },
      res => {
        if (res.didCancel) {
          //   취소 했을 경우
          return;
        }
        setResponse(res);
      },
    );
  };

  const onSubmit = async () => {
    setLoading(true);

    try {
      let photoURL = null;
      if (response) {
        const asset = response.assets[0];
        const extension = asset.fileName.split('.').pop(); // 확장자 추출
        const reference = storage().ref(`/profile/${uid}.${extension}`);

        if (isAndroid) {
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } else {
          // uploads file
          await reference.putFile(asset.uri);
        }

        photoURL = response ? await reference.getDownloadURL() : null;
      }

      const user = {
        id: uid,
        displayName,
        photoURL,
      };

      createUser(user);
      setUser(user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Image
          style={styles.circle}
          source={
            response
              ? {uri: response?.assets[0]?.uri}
              : require('../assets/img/user_default.png')
          }
        />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />

        {loading ? (
          <ActivityIndicator
            size={32}
            color="#6200ee"
            style={styles.spinnerWrapper}
          />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
      </View>
    </View>
  );
}

export default SetupProfile;

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 64,
    width: 128,
    height: 128,
  },
  form: {marginTop: 16, width: '100%'},
  spinnerWrapper: {
    marginTop: 48,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {marginTop: 48},
});

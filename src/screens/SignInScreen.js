import React, {useState, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params ?? {};

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeText = ({name, text}) => {
    setForm({...form, [name]: text});
  };
  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  const ActionButtons = () => {
    const onBack = () => navigation.goBack();
    const onSignIn = () => navigation.push('SignIn', {isSignUp: true});

    return isSignUp ? (
      <React.Fragment>
        <CustomButton title="회원가입" hasMarginBottom onPress={onSubmit} />
        <CustomButton title="로그인" theme="secondary" onPress={onBack} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <CustomButton title="로그인" hasMarginBottom onPress={onSubmit} />
        <CustomButton title="회원가입" theme="secondary" onPress={onSignIn} />
      </React.Fragment>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>RNPublicGallery</Text>
        <View style={styles.form}>
          <BorderedInput
            hasMarginBottom
            placeholder="이메일"
            value={form.email}
            onChangeText={text => onChangeText({name: 'email', text})}
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <BorderedInput
            secureTextEntry
            ref={passwordRef}
            placeholder="비밀번호"
            hasMarginBottom={isSignUp}
            value={form.password}
            onChangeText={text => onChangeText({name: 'password', text})}
            returnKeyType={isSignUp ? 'next' : 'done'}
            onSubmitEditing={() =>
              isSignUp ? confirmPasswordRef.current?.focus() : onSubmit()
            }
          />
          {isSignUp && (
            <BorderedInput
              secureTextEntry
              ref={confirmPasswordRef}
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChangeText={text =>
                onChangeText({name: 'confirmPassword', text})
              }
              returnKeyType="done"
              onSubmitEditing={onSubmit}
            />
          )}
          <View style={styles.buttons}>
            <ActionButtons />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    marginTop: 64,
  },
});

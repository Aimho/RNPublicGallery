import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

function SignForm({isSignUp, onSubmit, form, onChangeText}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
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
          onChangeText={text => onChangeText({name: 'confirmPassword', text})}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignForm;

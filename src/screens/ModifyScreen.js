import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import events from '../lib/events';
import {updatePost} from '../lib/posts';
import IconRightButton from '../components/IconRightButton';

function ModifyScreen() {
  const navigation = useNavigation();
  const {params} = useRoute();
  // Route Parameter의 description을 초기값으로 사용
  const [description, setDescription] = useState(params.description);

  const onSubmit = useCallback(async () => {
    await updatePost({id: params.id, description});

    events.emit('updatePost', {postId: params.id, description});

    navigation.pop();
  }, [navigation, params.id, description]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="check" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'height'})}
      keyboardVerticalOffset={Platform.select({ios: 88})}>
      <TextInput
        multiline
        style={styles.input}
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </KeyboardAvoidingView>
  );
}

export default ModifyScreen;

const styles = StyleSheet.create({
  block: {flex: 1},
  input: {padding: 16, flex: 1, fontSize: 16},
});

import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

function CustomButton({onPress, title, hasMarginBottom, theme = 'primary'}) {
  const isIos = Platform.OS === 'ios';
  const isPrimary = theme === 'primary';

  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          isIos && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: isPrimary ? '#fff' : '#6200ee',
        }}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#6200ee',
  },
  margin: {
    marginBottom: 8,
  },
});

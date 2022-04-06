import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const BorderedInput = React.forwardRef(({hasMarginBottom, ...rest}, ref) => {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      {...rest}
    />
  );
});

export default BorderedInput;

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: '#fff',
  },
  margin: {
    marginBottom: 16,
  },
});

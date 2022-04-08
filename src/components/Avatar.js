import React from 'react';
import {Image} from 'react-native';

function Avatar({source, size = 32, style}) {
  return (
    <Image
      source={source || require('../assets/img/user_default.png')}
      resizeMode="cover"
      style={[style, {width: size, height: size, borderRadius: size / 2}]}
    />
  );
}

export default Avatar;

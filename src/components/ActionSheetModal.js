import React from 'react';
import {StyleSheet, Modal, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ActionSheetModal({visible, onClose, actions}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          {actions.map(action => (
            <Pressable
              key={action.text}
              style={styles.actionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                action.onPress();
                onClose();
              }}>
              <Icon
                name={action.icon}
                color="#757575"
                size={24}
                style={styles.icon}
              />
              <Text style={styles.text}>{action.text}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

export default ActionSheetModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {marginRight: 6},
  text: {fontSize: 16},
});

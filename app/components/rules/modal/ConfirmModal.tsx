import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './ConfirmNotificationModal.styles';

interface ConfirmModalProps {
  text: string;
  visible: boolean;
  onCancel: () => void;
}

export default function ConfirmModal({ text, visible, onCancel }: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.text}>{text}</Text>

            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

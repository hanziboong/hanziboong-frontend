// components/modals/ConfirmNotificationModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './ConfirmNotificationModal.styles';

interface ConfirmNotificationModalProps {
  visible: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmNotificationModal({
  visible,
  name,
  onConfirm,
  onCancel,
}: ConfirmNotificationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.text}>{name}님에게 알림을 보냅니다.</Text>
              <TouchableOpacity style={styles.button} onPress={onConfirm}>
                <Text>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onCancel}>
                <Text>취소</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

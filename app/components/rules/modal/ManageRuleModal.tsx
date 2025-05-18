import styles from './ManageRuleModal.styles';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface ManageRuleModalProps {
  visible: boolean;
  ruleTitle: string;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ManageRuleModal({
  visible,
  ruleTitle,
  onEdit,
  onDelete,
  onClose,
}: ManageRuleModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>‘{ruleTitle}’ 규칙</Text>
            <TouchableOpacity style={styles.button} onPress={onEdit}>
              <Text style={styles.text}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <Text style={styles.text}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.text}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

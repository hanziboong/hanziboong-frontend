// components/modals/SelectPersonModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './SelectPersonModal.styles';

const people = ['현지', '민희', '선영'];

interface SelectPersonModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
}

export default function SelectPersonModal({ visible, onClose, onSelect }: SelectPersonModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>규칙 알림을 누구에게 보낼까요?</Text>
              <View style={styles.avatars}>
                {people.map((name) => (
                  <TouchableOpacity key={name} style={styles.circle} onPress={() => onSelect(name)}>
                    <Text style={styles.initial}>{name[0]}</Text>
                    <Text style={styles.name}>{name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

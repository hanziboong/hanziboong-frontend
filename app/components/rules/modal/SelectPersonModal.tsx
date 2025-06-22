// components/modals/SelectPersonModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styles from './SelectPersonModal.styles';
import { useHouseMembers } from '@/hook/useHouse';
import { Member } from '@/types/Member';

interface SelectPersonModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
}

export default function SelectPersonModal({ visible, onClose, onSelect }: SelectPersonModalProps) {
  const { data: members } = useHouseMembers();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <Text style={styles.title}>규칙 알림을 누구에게 보낼까요?</Text>
              <View style={styles.avatars}>
                {members?.map((member: Member) => (
                  <TouchableOpacity
                    key={member.id}
                    style={styles.circle}
                    onPress={() => onSelect(member.nickname)}
                  >
                    <Text style={styles.initial}>{member.nickname[0]}</Text>
                    <Text style={styles.name}>{member.nickname}</Text>
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

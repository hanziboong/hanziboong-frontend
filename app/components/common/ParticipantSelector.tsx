// components/ParticipantSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './ParticipantSelector.style';
import { MemberWithUI } from '@/types/Member';
import { Ionicons } from '@expo/vector-icons';

interface ParticipantSelectorProps {
  members: MemberWithUI[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}

export default function ParticipantSelector({
  members,
  selectedIds,
  onToggle,
}: ParticipantSelectorProps) {
  return (
    <View style={styles.container}>
      {members.map((member) => {
        const isSelected = selectedIds.includes(member.id);
        return (
          <TouchableOpacity
            key={member.id}
            style={[
              styles.circle,
              isSelected && styles.selectedCircle,
              member.disabled && styles.disabledCircle,
            ]}
            disabled={member.disabled}
            onPress={() => onToggle(member.id)}
          >
            <View style={styles.checkbox}>
              {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={[styles.name, member.disabled && styles.disabledText]}>
              {member.nickName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

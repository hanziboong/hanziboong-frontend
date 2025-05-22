// components/calendar/DetailModal.tsx
import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import FloatingAddButton from './FloatingAddButton';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import styles from './DetailModal.style';
import { ScheduleDetail } from '@/types/Schedule';

interface DetailModalProps {
  visible: boolean;
  date: string;
  schedules: ScheduleDetail[];
  onClose: () => void;
  onAddPress: () => void;
}

export default function DetailModal({
  visible,
  date,
  schedules,
  onClose,
  onAddPress,
}: DetailModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{dayjs(date).format('M월 D일')} 일정</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <FlatList
              data={schedules}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.scheduleItem}>
                  <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                  <View style={styles.scheduleTextBox}>
                    <Text style={styles.scheduleTitle}>{item.title}</Text>
                    <Text style={styles.scheduleDate}>
                      {dayjs(item.startAt).format('M월 D일')} ~{' '}
                      {dayjs(item.endAt).format('M월 D일')}
                    </Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <Text style={{ color: '#999', textAlign: 'center', marginTop: 8 }}>
                  일정이 없습니다.
                </Text>
              }
            />
          </View>

          <FloatingAddButton onPress={onAddPress} />
        </View>
      </Pressable>
    </Modal>
  );
}

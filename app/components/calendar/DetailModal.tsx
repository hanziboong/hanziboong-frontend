import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import FloatingAddButton from './FloatingAddButton';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    minHeight: '50%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  addButton: {
    marginTop: 12,
  },
  addText: {
    color: '#FFB338',
    textAlign: 'center',
    fontSize: 16,
  },
  closeText: {
    color: '#888',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  scheduleTextBox: {
    flexDirection: 'column',
  },
  scheduleTitle: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  scheduleDate: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
};

interface DetailModalProps {
  visible: boolean;
  date: string;
  schedules: Schedule[];
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
  const filtered = schedules.filter((item) => item.start === date);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Pressable 전체 눌림 방지용 */}
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>{dayjs(date).format('M월 D일')} 일정</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.scheduleItem}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <View style={styles.scheduleTextBox}>
                  <Text style={styles.scheduleTitle}>{item.title}</Text>
                  <Text style={styles.scheduleDate}>{dayjs(item.start).format('M월 D일')}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ color: '#999', textAlign: 'center', marginTop: 8 }}>
                일정이 없습니다.
              </Text>
            }
          />

          <FloatingAddButton onPress={onAddPress} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

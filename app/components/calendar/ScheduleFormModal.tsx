// components/ScheduleFormModal.tsx
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

interface ScheduleFormModalProps {
  visible: boolean;
  date: string;
  onClose: () => void;
  onSubmit: (schedule: { title: string; date: string; start: Date; end: Date }) => void;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#FFB338',
    padding: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    textAlign: 'center',
    color: '#888',
  },
});

export default function ScheduleFormModal({
  visible,
  date,
  onClose,
  onSubmit,
}: ScheduleFormModalProps) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, date, start, end });
    }
    setTitle('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>{date} 일정 추가</Text>

          <TextInput
            placeholder="제목 입력"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TouchableOpacity onPress={() => setShowStart(true)}>
            <Text style={styles.input}>{`시작: ${dayjs(start).format('YYYY-MM-DD HH:mm')}`}</Text>
          </TouchableOpacity>
          {showStart && (
            <DateTimePicker
              value={start}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(e, selected) => {
                setShowStart(false);
                if (selected) setStart(selected);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowEnd(true)}>
            <Text style={styles.input}>{`종료: ${dayjs(end).format('YYYY-MM-DD HH:mm')}`}</Text>
          </TouchableOpacity>
          {showEnd && (
            <DateTimePicker
              value={end}
              mode="datetime"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={(e, selected) => {
                setShowEnd(false);
                if (selected) setEnd(selected);
              }}
            />
          )}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>저장</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

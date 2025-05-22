// components/ScheduleFormModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import styles from './ScheduleFormModal.style';

interface ScheduleFormModalProps {
  visible: boolean;
  date: string;
  onClose: () => void;
  onSubmit: (schedule: { title: string; date: string; start: Date; end: Date }) => void;
}

export default function ScheduleFormModal({
  visible,
  date,
  onClose,
  onSubmit,
}: ScheduleFormModalProps) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(() => {
    const parsed = dayjs(date);
    return parsed.isValid() ? parsed.toDate() : new Date();
  });

  const [end, setEnd] = useState(() => {
    const parsed = dayjs(date);
    return parsed.isValid() ? parsed.add(1, 'day').toDate() : new Date();
  });

  useEffect(() => {
    const parsed = dayjs(date);
    if (parsed.isValid()) {
      setStart(parsed.toDate());
      setEnd(parsed.add(1, 'day').toDate());
    }
  }, [date]);

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // 제출 클릭 시
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, date, start, end });
    }
    setTitle('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ width: '100%' }}
          >
            <SafeAreaView style={styles.modalBox} edges={['bottom']}>
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                  <Text style={styles.submitText}>저장</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="일정 제목을 입력하세요"
                value={title}
                onChangeText={setTitle}
                style={styles.titleInput}
              />

              <View style={styles.dateContainer}>
                <View style={styles.dateItem}>
                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>시작</Text>
                    <TouchableOpacity
                      onPress={() => setShowStart((prev) => !prev)}
                      style={styles.dateButton}
                    >
                      <Text style={styles.dateText}>{dayjs(start).format('YYYY-MM-DD HH:mm')}</Text>
                    </TouchableOpacity>
                  </View>

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
                </View>

                <View style={styles.dateItem}>
                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>종료</Text>
                    <TouchableOpacity
                      onPress={() => setShowEnd((prev) => !prev)}
                      style={styles.dateButton}
                    >
                      <Text style={styles.dateText}>{dayjs(end).format('YYYY-MM-DD HH:mm')}</Text>
                    </TouchableOpacity>
                  </View>
                  {showEnd && (
                    <DateTimePicker
                      value={end}
                      mode="datetime"
                      timeZoneName="short"
                      display={Platform.OS === 'ios' ? 'inline' : 'default'}
                      onChange={(e, selected) => {
                        setShowEnd(false);
                        if (selected) setEnd(selected);
                      }}
                    />
                  )}
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Pressable>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

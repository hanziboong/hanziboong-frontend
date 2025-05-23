// components/ScheduleFormModal.tsx
import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ScheduleFormModal.style';
import ParticipantSelector from '@/components/common/ParticipantSelector';
import { useCreateSchedule } from '@/hook/useSchedules';

interface ScheduleFormModalProps {
  visible: boolean;
  date: string;
  onClose: () => void;
}

export default function ScheduleFormModal({ visible, date, onClose }: ScheduleFormModalProps) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(dayjs().add(1, 'day').toDate());
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { mutate: createSchedule } = useCreateSchedule();

  const members = [
    { id: 1, nickName: '현지', houseId: 1 },
    { id: 2, nickName: '민희', houseId: 1 },
    { id: 3, nickName: '선영', houseId: 1 },
  ];

  useEffect(() => {
    const parsed = dayjs(date);
    if (parsed.isValid()) {
      setStart(parsed.toDate());
      setEnd(parsed.add(1, 'day').toDate());
    }
  }, [date]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  // 일정 등록
  const handleSubmit = () => {
    const schedule = {
      houseId: 1,
      title,
      startAt: dayjs(start),
      endAt: dayjs(end),
      participantUserId: selectedIds,
    };
    createSchedule(schedule);
    setTitle('');
    setSelectedIds([]);
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

              {/* 시작 시간 선택 */}
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setStartPickerVisible(true)}
              >
                <Text style={styles.dateText}>시작: {dayjs(start).format('YYYY-MM-DD HH:mm')}</Text>
              </TouchableOpacity>

              {/* 종료 시간 선택 */}
              <TouchableOpacity style={styles.dateButton} onPress={() => setEndPickerVisible(true)}>
                <Text style={styles.dateText}>종료: {dayjs(end).format('YYYY-MM-DD HH:mm')}</Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isStartPickerVisible}
                mode="datetime"
                onConfirm={(selected) => {
                  setStart(selected);
                  setStartPickerVisible(false);
                }}
                onCancel={() => setStartPickerVisible(false)}
              />

              <DateTimePickerModal
                isVisible={isEndPickerVisible}
                mode="datetime"
                onConfirm={(selected) => {
                  setEnd(selected);
                  setEndPickerVisible(false);
                }}
                onCancel={() => setEndPickerVisible(false)}
              />

              <ParticipantSelector
                members={members}
                selectedIds={selectedIds}
                onToggle={toggleSelection}
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Pressable>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

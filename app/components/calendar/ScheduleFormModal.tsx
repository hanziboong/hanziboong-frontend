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
import ParticipantSelector from '@/components/common/ParticipantSelector';
import { Schedule } from '@/types/Schedule';
import { useCreateSchedule } from '@/hook/useSchedules';

interface ScheduleFormModalProps {
  visible: boolean;
  date: string;
  onClose: () => void;
  onSubmit: (schedule: Schedule) => void;
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

  // 목업 데이터
  const members = [
    { id: 1, nickName: '현지', houseId: 1 },
    { id: 2, nickName: '민희', houseId: 1 },
    { id: 3, nickName: '선영', houseId: 1 },
  ];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const createSchedule = useCreateSchedule();

  // 선택 토글
  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  // 날짜 선택시 시작, 종료 날짜 설정
  useEffect(() => {
    const parsed = dayjs(date);
    if (parsed.isValid()) {
      setStart(parsed.toDate());
      setEnd(parsed.add(1, 'day').toDate());
    }
  }, [date]);

  // 시작, 종료 날짜 선택 모달 표시
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // 제출 클릭 시
  const handleSubmit = () => {
    const schedule = {
      houseId: 1, // TODO: 홈 아이디 추가
      title,
      startAt: dayjs(start),
      endAt: dayjs(end),
      participantUserId: selectedIds,
    };
    createSchedule.mutate(schedule);
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
                <ParticipantSelector
                  members={members}
                  selectedIds={selectedIds}
                  onToggle={toggleSelection}
                />
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </Pressable>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

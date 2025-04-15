// components/ScheduleFormModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    minHeight: '50%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  titleInput: {
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#FFB338',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  dateLabel: {
    width: 50,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 8,
  },

  dateText: {
    fontSize: 14,
    color: '#000',
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

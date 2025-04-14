import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#525252',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#f0ad4e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function ScheduleFormScreen() {
  const navigation = useNavigation();

  type RootStackParamList = {
    ScheduleForm: { defaultDate?: string };
  };

  const route = useRoute<RouteProp<RootStackParamList, 'ScheduleForm'>>();
  const defaultDate = route.params?.defaultDate ? dayjs(route.params.defaultDate) : dayjs();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [startDate, setStartDate] = useState(defaultDate.hour(9).minute(0).toDate());
  const [endDate, setEndDate] = useState(defaultDate.hour(18).minute(0).toDate());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSubmit = () => {
    console.log({
      title,
      desc,
      startDate,
      endDate,
    });
    navigation.goBack(); // 저장 후 캘린더로 돌아가기
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }}>
        <Text style={styles.label}>일정 제목</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 입력하세요"
          style={styles.input}
          autoFocus
        />

        <Text style={styles.label}>일정 설명</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          placeholder="설명을 입력하세요"
          style={[styles.input, { height: 80 }]}
          multiline
          autoFocus
        />

        <Text style={styles.label}>시작 일시</Text>
        <TouchableOpacity onPress={() => setShowStartPicker((prev) => !prev)}>
          <Text style={styles.dateText}>{dayjs(startDate).format('YYYY.MM.DD A h:mm')}</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(e, selected) => {
              setShowStartPicker(false);
              if (selected) setStartDate(selected);
            }}
          />
        )}

        <Text style={styles.label}>종료 일시</Text>
        <TouchableOpacity onPress={() => setShowEndPicker((prev) => !prev)}>
          <Text style={styles.dateText}>{dayjs(endDate).format('YYYY.MM.DD A h:mm')}</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(e, selected) => {
              setShowEndPicker(false);
              if (selected) setEndDate(selected);
            }}
          />
        )}

        <View style={{ marginTop: 32 }}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

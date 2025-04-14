// CalendarScreen.tsx
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

const mockSchedules = [
  { id: '1', date: '2025-04-01', title: '분리수거', color: '#f8d7da' },
  { id: '2', date: '2025-04-01', title: '회의', color: '#d6d8fb' },
  { id: '3', date: '2025-04-02', title: '출장', color: '#d4edda' },
];

interface DayData {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: DayData) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const markedDates = mockSchedules.reduce(
    (acc, cur) => {
      if (!acc[cur.date]) {
        acc[cur.date] = { marked: true, dots: [] };
      }
      acc[cur.date].dots.push({ color: cur.color });
      return acc;
    },
    {} as Record<string, { marked: boolean; dots: { color: string }[] }>,
  );

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType="period"
        style={{
          height: 500,
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#dd99ee',
        }}
      />
    </View>
  );
}

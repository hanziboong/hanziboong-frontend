// CalendarScreen.tsx
import { View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import FloatingAddButton from '../components/calendar/FloatingAddButton';
import { useState } from 'react';
import DetailModal from '@/components/calendar/DetailModal';
import buildMarkedDatesFromSchedules from '@/hook/markedDatesFromSchedules';
import ScheduleFormModal from '@/components/calendar/ScheduleFormModal';

export default function CalendarScreen() {
  const [detailVisible, setDetailVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const mockSchedules = [
    {
      id: '1',
      title: '일정 1',
      start: '2025-04-15',
      end: '2025-04-16',
      color: '#5f9ea0',
    },
    {
      id: '2',
      title: '일정 2',
      start: '2025-04-16',
      end: '2025-04-17',
      color: '#ffa500',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Calendar
        horizontal
        pagingEnabled
        markedDates={buildMarkedDatesFromSchedules(mockSchedules)}
        markingType="multi-period"
        style={{
          height: 500,
        }}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setDetailVisible(true);
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#404040',
          selectedDayBackgroundColor: '#FFB338',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#FFB338',
          arrowColor: '#FFB338',
          dotColor: '#FFB338',
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: 'red',
            },
            dayTextAtIndex6: {
              color: 'blue',
            },
          },
        }}
      />
      <FloatingAddButton
        onPress={() => {
          setFormVisible(true);
        }}
      />
      <DetailModal
        visible={detailVisible}
        date={selectedDate}
        schedules={mockSchedules}
        onClose={() => setDetailVisible(false)}
        onAddPress={() => {
          setDetailVisible(false);
          setTimeout(() => {
            setFormVisible(true);
          }, 100);
        }}
      />
      <ScheduleFormModal
        visible={formVisible}
        date={selectedDate}
        onClose={() => setFormVisible(false)}
        // TODO : 제출 로직 추가 필요
        onSubmit={() => {}}
      />
    </View>
  );
}

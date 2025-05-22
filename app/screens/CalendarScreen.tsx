// CalendarScreen.tsx
import { View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import FloatingAddButton from '../components/calendar/FloatingAddButton';
import { useState } from 'react';
import DetailModal from '@/components/calendar/DetailModal';
import buildMarkedDatesFromSchedules from '@/hook/markedDatesFromSchedules';
import ScheduleFormModal from '@/components/calendar/ScheduleFormModal';
import { useSchedules } from '@/hook/useSchedules';

export default function CalendarScreen() {
  const [detailVisible, setDetailVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const { data, isLoading, error } = useSchedules(currentMonth.year, currentMonth.month);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Calendar
        horizontal
        pagingEnabled
        markedDates={buildMarkedDatesFromSchedules(data ?? [])}
        markingType="multi-period"
        style={{
          height: 500,
        }}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setDetailVisible(true);
        }}
        onMonthChange={(month: DateData) => {
          const { year, month: monthValue } = month;
          setCurrentMonth({ year, month: monthValue });
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
        schedules={data ?? []}
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

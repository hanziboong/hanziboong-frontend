// CalendarScreen.tsx
import { View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import FloatingAddButton from '../components/calendar/FloatingAddButton';
import { useState, useMemo } from 'react';
import DetailModal from '@/components/calendar/DetailModal';
import buildMarkedDatesFromSchedules from '@/hook/markedDatesFromSchedules';
import ScheduleFormModal from '@/components/calendar/ScheduleFormModal';
import { useSchedules } from '@/hook/useSchedules';
import { ScheduleDetail } from '@/types/Schedule';
import dayjs from '@/lib/dayjs';

const COLORS = ['#f0c987', '#f8d7da', '#d4edda', '#ffa500', '#87ceeb'];

// 날짜별로 일정 매핑
function getDateRangeMap(schedules: ScheduleDetail[]) {
  const map: Record<string, ScheduleDetail[]> = {};

  schedules.forEach((schedule) => {
    const start = dayjs(schedule.startAt);
    const end = dayjs(schedule.endAt);
    const diff = end.diff(start, 'day');

    for (let i = 0; i <= diff; i += 1) {
      const currentDate = start.add(i, 'day').format('YYYY-MM-DD');
      if (!map[currentDate]) {
        map[currentDate] = [];
      }
      map[currentDate].push(schedule);
    }
  });

  return map;
}

export default function CalendarScreen() {
  const [detailVisible, setDetailVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [visibleSchedules, setVisibleSchedules] = useState<ScheduleDetail[]>([]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const { data: allSchedules } = useSchedules(currentMonth.year, currentMonth.month);

  const schedulesWithColor = useMemo(() => {
    if (!allSchedules) return [];
    return allSchedules.map((schedule: ScheduleDetail, index: number) => ({
      ...schedule,
      color: COLORS[index % COLORS.length],
    }));
  }, [allSchedules]);

  const dateScheduleMap = useMemo(() => {
    return getDateRangeMap(schedulesWithColor);
  }, [schedulesWithColor]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Calendar
        horizontal
        pagingEnabled
        markedDates={buildMarkedDatesFromSchedules(schedulesWithColor)}
        markingType="multi-period"
        style={{ height: 500 }}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setVisibleSchedules(dateScheduleMap[day.dateString] ?? []);
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
            dayTextAtIndex0: { color: 'red' },
            dayTextAtIndex6: { color: 'blue' },
          },
        }}
      />

      <FloatingAddButton onPress={() => setFormVisible(true)} />

      <DetailModal
        visible={detailVisible}
        date={selectedDate}
        schedules={visibleSchedules}
        onClose={() => setDetailVisible(false)}
        onAddPress={() => {
          setDetailVisible(false);
          setTimeout(() => setFormVisible(true), 100);
        }}
      />

      <ScheduleFormModal
        visible={formVisible}
        date={selectedDate}
        onClose={() => setFormVisible(false)}
        onSubmit={() => {}}
      />
    </View>
  );
}

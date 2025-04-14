// 달력 그리드

import { View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import DayCell from '@/components/calendar/DayCell';

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

interface CalendarGridProps {
  currentMonth: dayjs.Dayjs;
  onDayPress: (date: string) => void;
}

export default function CalendarGrid({ currentMonth, onDayPress }: CalendarGridProps) {
  const start = currentMonth.startOf('month').startOf('week');
  const end = currentMonth.endOf('month').endOf('week');

  const dates = [];
  let curr = start;
  while (curr.isBefore(end) || curr.isSame(end)) {
    dates.push(curr);
    curr = curr.add(1, 'day');
  }

  return (
    <View style={styles.grid}>
      {dates.map((date) => (
        <DayCell
          key={date.format('YYYY-MM-DD')}
          date={date}
          currentMonth={currentMonth}
          onPress={() => onDayPress(date.format('YYYY-MM-DD'))}
        />
      ))}
    </View>
  );
}

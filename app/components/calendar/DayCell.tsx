import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  cell: {
    width: '14.28%',
    height: 80,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: '#f0ad4e',
  },
  text: {
    fontSize: 14,
  },
  todayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outsideMonth: {
    color: '#ccc',
  },
});

interface DayCellProps {
  date: dayjs.Dayjs;
  onPress: () => void;
  currentMonth: dayjs.Dayjs;
}

export default function DayCell({ date, onPress, currentMonth }: DayCellProps) {
  const isToday = date.isSame(dayjs(), 'day');
  const isCurrentMonth = date.month() === currentMonth.month();

  return (
    <TouchableOpacity style={styles.cell} onPress={onPress}>
      <View style={[styles.dayWrap, isToday && styles.todayCircle]}>
        <Text
          style={[styles.text, !isCurrentMonth && styles.outsideMonth, isToday && styles.todayText]}
        >
          {date.date()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

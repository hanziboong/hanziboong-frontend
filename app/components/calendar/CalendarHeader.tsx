import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0ad4e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  month: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrow: {
    fontSize: 20,
    color: '#fff',
  },
});

interface CalendarHeaderProps {
  currentMonth: dayjs.Dayjs;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({ currentMonth, onPrev, onNext }: CalendarHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev}>
        <Text style={styles.arrow}>◀</Text>
      </TouchableOpacity>
      <Text style={styles.month}>{currentMonth.format('YYYY년 M월')}</Text>
      <TouchableOpacity onPress={onNext}>
        <Text style={styles.arrow}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

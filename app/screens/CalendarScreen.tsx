import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import FloatingAddButton from '@/components/calendar/FloatingAddButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  type RootStackParamList = {
    Calendar: undefined;
    ScheduleForm: { defaultDate?: string };
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDayPress = (date: string) => {
    navigation.navigate('ScheduleForm', { defaultDate: date });
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
        onNext={() => setCurrentMonth(currentMonth.add(1, 'month'))}
      />
      <CalendarGrid currentMonth={currentMonth} onDayPress={handleDayPress} />
      <FloatingAddButton
        onPress={() => {
          const today = dayjs().format('YYYY-MM-DD');
          navigation.navigate('ScheduleForm', { defaultDate: today });
        }}
      />
    </View>
  );
}

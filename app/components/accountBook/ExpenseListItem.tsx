import dayjs from 'dayjs';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ExpenseListItem.styles';
import { ExpenseItemDetail } from '@/types/expense';

interface ExpenseListItemProps {
  expense: ExpenseItemDetail;
  onPress: () => void;
}

export default function ExpenseListItem({ expense, onPress }: ExpenseListItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Text style={styles.date}>{dayjs(expense.spendAt).format('MM.DD')}</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{expense.title}</Text>
        <View style={styles.participants}>
          {expense.expenseParticipants.map((p) => (
            <View key={p.id} style={styles.participant}>
              <Text style={styles.participantName}>{p.nickName}</Text>
              <Ionicons name="checkmark" size={14} color={p.settled ? '#FFB338' : '#ccc'} />
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.amount}>- {expense.expenditure.toLocaleString()}원</Text>
    </TouchableOpacity>
  );
}

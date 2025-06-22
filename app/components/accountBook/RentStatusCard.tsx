// 월세납부현황
// components/accountBook/RentStatusCard.tsx

import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '@/components/common/ProgressBar';
import styles from './RentStatusCard.styles';

// 임의로 정적데이터
const data = [
  { id: 1, name: '현지', amount: 250000, paid: true },
  { id: 2, name: '은혜', amount: 250000, paid: false },
  { id: 3, name: '영희', amount: 250000, paid: true },
];

export default function RentStatusCard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>월세납부현황</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </View>

      <ProgressBar progress={2 / 3} />
      <Text style={styles.progressText}>2/3</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.paymentRow}>
            <Text style={styles.amount}>
              {item.name} | {item.amount.toLocaleString()}원
            </Text>
            <Ionicons name={item.paid ? 'checkbox' : 'square-outline'} size={20} color="#fff" />
          </View>
        )}
      />
    </View>
  );
}

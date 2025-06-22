import RentStatusCard from '@/components/accountBook/RentStatusCard';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default function AccountBookScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* 월세 납부현황 + 사야 할 물건 */}
        <RentStatusCard />
      </View>
    </View>
  );
}

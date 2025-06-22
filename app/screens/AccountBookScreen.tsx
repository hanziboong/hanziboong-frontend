import RentStatusCard from '@/components/accountBook/RentStatusCard';
import ShoppingListCard from '@/components/accountBook/ShoppingListCard';
import { useToBuy } from '@/hook/useToBuy';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { ToBuy } from '@/types/toBuy';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import styles from './AccountBookScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { useExpense } from '@/hook/useExpense';
import ExpenseListItem from '@/components/accountBook/ExpenseListItem';
import FloatingAddButton from '@/components/calendar/FloatingAddButton';

export default function AccountBookScreen() {
  const { data: toBuyData } = useToBuy();
  const [toBuy, setToBuy] = useState<ToBuy[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data: expenses } = useExpense();
  useEffect(() => {
    setToBuy(toBuyData ?? []);
  }, [toBuyData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.cardWrapper}>
          <RentStatusCard />
        </View>

        <View style={styles.cardWrapper}>
          <ShoppingListCard
            items={toBuy.map((item) => ({
              id: item.id,
              name: item.name,
              checked: item.checked,
            }))}
            onPressMore={() => {
              navigation.navigate('ShoppingDetail');
            }}
          />
        </View>
      </View>
      <View style={styles.listWrapper}>
        <Text style={styles.title}>공동 지출 내역</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ExpenseListItem
              expense={item}
              onPress={() => navigation.navigate('ExpenseDetailScreen', { id: item.id })}
            />
          )}
        />

        <FloatingAddButton
          onPress={() => navigation.navigate('ExpenseFormScreen', { id: 0, isEdit: false })}
        />
      </View>
    </View>
  );
}

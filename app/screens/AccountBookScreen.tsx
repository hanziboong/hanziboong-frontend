import RentStatusCard from '@/components/accountBook/RentStatusCard';
import ShoppingListCard from '@/components/accountBook/ShoppingListCard';
import { useToBuy } from '@/hook/useToBuy';
import { View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ToBuy } from '@/types/toBuy';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    height: 180,
  },
  cardWrapper: {
    flex: 1,
  },
});

export default function AccountBookScreen() {
  const { data: toBuyData } = useToBuy();
  const [toBuy, setToBuy] = useState<ToBuy[]>([]);
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
              name: item.item,
              checked: item.checked,
            }))}
            onPressMore={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

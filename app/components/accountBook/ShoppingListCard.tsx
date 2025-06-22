// components/accountBook/ShoppingListCard.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import styles from './ShoppingListCard.styles';

interface ShoppingItem {
  id: number;
  name: string;
  checked: boolean;
}

interface ShoppingListCardProps {
  items: ShoppingItem[];
  onPressMore: () => void;
}

export default function ShoppingListCard({ items, onPressMore }: ShoppingListCardProps) {
  // 최대 4개까지 미체크된 항목 기준 정렬

  const sorted = Array.isArray(items)
    ? [...items].sort((a, b) => Number(a.checked) - Number(b.checked)).slice(0, 4)
    : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressMore}>
        <View style={styles.header}>
          <Text style={styles.title}>사야할 물건</Text>

          <Feather name="chevron-right" size={20} color="#999" />
        </View>
      </TouchableOpacity>

      {sorted.length === 0 ? (
        <Text style={styles.empty}>모든 항목을 완료했어요!</Text>
      ) : (
        <FlatList
          data={sorted}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Ionicons
                name={item.checked ? 'checkbox' : 'square-outline'}
                size={24}
                color={item.checked ? '#FFB338' : '#ccc'}
              />
              <Text
                style={[
                  styles.itemText,
                  item.checked && { textDecorationLine: 'line-through', color: '#999' },
                ]}
              >
                {item.name}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

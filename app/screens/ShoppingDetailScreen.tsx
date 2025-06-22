// screens/ShoppingDetailScreen.tsx
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useMemo, useLayoutEffect } from 'react';
import { useCheckToBuy, useCreateToBuy, useToBuy } from '@/hook/useToBuy';
import styles from './ShoppingDetailScreen.styles';
import { ToBuy } from '@/types/toBuy';
import { useNavigation } from '@react-navigation/native';

export default function ShoppingDetailScreen() {
  const { data: toBuyData } = useToBuy();
  const checkToBuy = useCheckToBuy();
  const createToBuy = useCreateToBuy();
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const unchecked = useMemo(() => toBuyData?.filter((item: ToBuy) => !item.checked), [toBuyData]);
  const checked = useMemo(() => toBuyData?.filter((item: ToBuy) => item.checked), [toBuyData]);
  const listData = useMemo(() => [...unchecked, ...checked], [unchecked, checked]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ fontSize: 18, fontWeight: 500 }}>사야 할 물건</Text>,
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 16 }}>
          <Ionicons name="add" size={24} color="#FFB338" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
          <Ionicons name="chevron-back" size={24} color="#FFB338" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'white',
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  // 물건 추가
  const handleAdd = () => {
    if (input.trim()) {
      createToBuy.mutate(input.trim());
      setInput('');
      setModalVisible(false);
    }
  };

  // 물건 체크
  const handleToggle = (id: number) => {
    checkToBuy.mutate(id);
  };

  // 물건 렌더링
  const renderItem = (item: ToBuy) => {
    return (
      <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleToggle(item.id)}>
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={<Text style={styles.empty}>항목이 없습니다.</Text>}
      />

      {/* 모달 */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>물건 추가</Text>
            <TextInput
              placeholder="물건 이름"
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
              <Text style={styles.saveText}>추가</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

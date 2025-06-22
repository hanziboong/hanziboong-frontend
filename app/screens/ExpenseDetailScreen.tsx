// screens/ExpenseDetailScreen.tsx
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { useEffect } from 'react';
import styles from './ExpenseDetailScreen.styles';
import { useDeleteExpense, useExpenseById, useExpenseStatus } from '@/hook/useExpense';
import { ExpenseParticipant } from '@/types/expense';
import dayjs from 'dayjs';

export default function ExpenseDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };
  const { data: expense } = useExpenseById(id);
  const { mutate: updateSettlement } = useExpenseStatus();
  const { mutate: deleteExpense } = useDeleteExpense();
  const [localSettledMap, setLocalSettledMap] = useState<Record<number, boolean>>({});
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const menuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    if (expense?.expenseParticipants) {
      const initialSettled: Record<number, boolean> = {};
      expense.expenseParticipants.forEach((p: ExpenseParticipant) => {
        initialSettled[p.id] = p.settled;
      });
      setLocalSettledMap(initialSettled);
    }
  }, [expense]);

  // 정산 상태 토글
  const toggleSettled = (participantId: number) => {
    const prev = localSettledMap[participantId];
    const next = !prev;

    setLocalSettledMap((prevMap) => ({
      ...prevMap,
      [participantId]: next,
    }));

    updateSettlement(
      { id: participantId, settled: next },
      {
        onError: () => {
          setLocalSettledMap((prevMap) => ({
            ...prevMap,
            [participantId]: prev,
          }));
        },
      },
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '지출 상세보기',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
          <Ionicons name="chevron-back" size={24} color="#FFB338" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 16 }} onPress={menuToggle}>
          <Ionicons name="ellipsis-vertical" size={20} color="#FFB338" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'white',
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
      },
    });
  }, [navigation, menuToggle]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{expense?.title}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>지출 비용</Text>
        <Text style={styles.boldLabel}>- {expense?.expenditure.toLocaleString()}원</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>지출 일시</Text>
        <Text style={styles.value}>{dayjs(expense?.spendAt).format('MM.DD')}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>함께 지출한 메이트</Text>
        <Text style={styles.value}>
          {expense?.expenseParticipants.map((p: ExpenseParticipant) => p.nickName).join(', ')}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>정산 현황</Text>

      {expense?.expenseParticipants.map((p: ExpenseParticipant) => (
        <View key={p.id} style={styles.participantRow}>
          <View style={styles.participantInfo}>
            <Text style={styles.name}>{p.nickName}</Text>
            <Text style={styles.amount}>{p.amountToPay.toLocaleString()}원</Text>
            <Text style={[styles.status, p.settled ? styles.settled : styles.unsettled]}>
              {p.settled ? '정산완료' : '정산전'}
            </Text>
          </View>
          <Switch value={localSettledMap[p.id]} onValueChange={() => toggleSettled(p.id)} />
        </View>
      ))}

      <Text style={styles.sectionTitle}>메모</Text>
      <TextInput value={expense?.memo} editable={false} multiline style={styles.memoBox} />

      {isMenuVisible && (
        <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>수정</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setIsMenuVisible(false);
                setIsDeleteConfirmVisible(true);
              }}
            >
              <Text style={styles.menuText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}

      {isDeleteConfirmVisible &&
        Alert.alert(
          '삭제 확인',
          '정말로 이 지출 내역을 삭제하시겠습니까?',
          [
            {
              text: '취소',
              onPress: () => setIsDeleteConfirmVisible(false),
              style: 'cancel',
            },
            {
              text: '삭제',
              onPress: () => {
                setIsDeleteConfirmVisible(false);
                deleteExpense(id);
                navigation.goBack();
              },
              style: 'destructive',
            },
          ],
          { cancelable: true },
        )}
    </ScrollView>
  );
}

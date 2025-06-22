// screens/ExpenseFormScreen.tsx
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ExpenseFormScreen.styles';
import { useExpenseById, useCreateExpense, useUpdateExpense } from '@/hook/useExpense';
import { Expense } from '@/types/expense';
import MemberSelectionSection from '@/components/accountBook/MemberSelectionSection';

export default function ExpenseFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, isEdit } = route.params as { id: number; isEdit: boolean };

  const { data: existingExpense } = useExpenseById(id, {
    enabled: isEdit && id !== 0,
  });

  const { mutate: createExpense } = useCreateExpense();
  const { mutate: updateExpense } = useUpdateExpense();
  const [expense, setExpense] = useState<Expense>({
    houseId: 1,
    paidMemberId: 1, // 현재 로그인 유저
    participantMemberId: [],
    title: '',
    expenditure: 0,
    memo: '',
  });

  // 기존 지출 내역 조회
  useEffect(() => {
    if (isEdit && existingExpense) {
      setExpense({
        houseId: 1,
        paidMemberId: existingExpense.paidMember.id,
        participantMemberId: existingExpense.expenseParticipants.map(
          (participant) => participant.memberId,
        ),
        title: existingExpense.title,
        expenditure: existingExpense.expenditure,
        memo: existingExpense.memo,
      });
    }
  }, [isEdit, existingExpense]);

  // 지출 등록 또는 수정
  const handleSubmit = useCallback(() => {
    if (isEdit) {
      updateExpense({ expense, id });
    } else {
      createExpense(expense);
    }
    navigation.goBack();
  }, [isEdit, updateExpense, expense, id, createExpense, navigation]);

  // 헤더 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit ? '지출 수정하기' : '공동지출 등록하기',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
          <Ionicons name="chevron-back" size={24} color="#FFB338" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit} style={styles.headerRightButton}>
          <Text style={styles.headerRightText}>{isEdit ? '수정' : '등록'}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSubmit, isEdit]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          value={expense.title}
          onChangeText={(text) => setExpense({ ...expense, title: text })}
          placeholder="항목을 입력하세요"
        />

        <View style={styles.row}>
          <Text style={styles.label}>지출 비용</Text>
          <TextInput
            style={styles.expenditureInput}
            value={expense.expenditure.toString()}
            onChangeText={(text) => setExpense({ ...expense, expenditure: Number(text) })}
            placeholder="비용을 입력하세요"
          />
        </View>

        <Text style={styles.label}>메모</Text>
        <TextInput
          style={styles.memoInput}
          value={expense.memo}
          onChangeText={(text) => setExpense({ ...expense, memo: text })}
          placeholder="메모를 입력하세요"
          multiline
        />

        <MemberSelectionSection
          selectedMemberIds={expense.participantMemberId}
          setSelectedMemberIds={(ids: number[] | ((prev: number[]) => number[])) =>
            setExpense((prev) => ({
              ...prev,
              participantMemberId: typeof ids === 'function' ? ids(prev.participantMemberId) : ids,
            }))
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

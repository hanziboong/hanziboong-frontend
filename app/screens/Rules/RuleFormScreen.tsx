import { useLayoutEffect, useRef, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import RuleForm, { RuleFormRef } from '@/components/rules/RuleForm';
import { useCreateRule, useUpdateRule } from '@/hook/useRules';

function HeaderRight({ onPress, label }: { onPress: () => void; label: string }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 60,
        height: 30,
        backgroundColor: '#FFB338',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function RuleFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'RuleFormScreen'>>();
  const isEdit = route.params?.mode === 'edit';
  const formRef = useRef<RuleFormRef>(null);
  const createRule = useCreateRule();
  const updateRule = useUpdateRule();

  const handleSubmit = useCallback(() => {
    const values = formRef.current?.getValues();
    if (!values) return;

    // TODO: 회원 아이디 나중에 추가
    if (isEdit) {
      updateRule.mutate(
        { ...values, id: route.params?.rule?.id ?? 0, memberId: 1 },
        { onSuccess: () => navigation.goBack() },
      );
    } else {
      createRule.mutate(
        { ...values, id: 0, memberId: 1 },
        { onSuccess: () => navigation.goBack() },
      );
    }
  }, [createRule, updateRule, route.params?.rule?.id, isEdit, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight onPress={handleSubmit} label={isEdit ? '수정' : '등록'} />,
    });
  }, [navigation, isEdit, handleSubmit]);

  return <RuleForm ref={formRef} defaultValues={route.params?.rule} />;
}

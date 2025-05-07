// screens/RulesScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Rule } from '@/types/Rule';
import { RootStackParamList } from '@/types/navigation';
import styles from './RulesScreen.styles';
import ManageRuleModal from '@/components/rules/modal/ManageRuleModal';
import SelectPersonModal from '@/components/rules/modal/SelectPersonModal';
import ConfirmNotificationModal from '@/components/rules/modal/ConfirmNotificationModal';

export default function RulesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      title: '밤 11시 이후에는 불 끄기',
      description: '개인 방은 상관없음!',
    },
    {
      id: '2',
      title: '집 비우기 최소 이틀 전에는 한지붕에 일정 등록하고 카톡방에도 말해주기',
      description: '',
    },
    {
      id: '3',
      title: '집에 누구 초대하고 싶으면 룸메랑 상의하고 초대하기',
      description: '단, 이성은 이유불문 초대 불가',
    },
    {
      id: '4',
      title: '분리수거는 번갈아가면서 하기',
      description: '매달 1, 3주 - 현지\n매달 2, 4주 - 은혜\n5주차 이후 - 둘이 상의해서 정하기',
    },
  ]);

  const [manageModalVisible, setManageModalVisible] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  // 더보기 버튼을 눌렀을 때
  const handlePressMore = (rule: Rule) => {
    setSelectedRule(rule);
    setManageModalVisible(true);
  };

  // 알림 버튼을 눌렀을 때
  const handlePressAlarm = (rule: Rule) => {
    setSelectedRule(rule);
    setAlarmModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('RuleFormScreen', { mode: 'add' })}
        >
          <Text style={styles.addButtonText}>규칙추가하기</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rules}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.index}>{index + 1}</Text>
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                {!!item.description && <Text style={styles.description}>{item.description}</Text>}
              </View>
              <TouchableOpacity onPress={() => handlePressAlarm(item)} style={styles.icon}>
                <Ionicons name="notifications-outline" size={20} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handlePressMore(item)} style={styles.icon}>
                <Ionicons name="ellipsis-vertical" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>규칙이 없습니다.</Text>}
      />
      {selectedRule && (
        <ManageRuleModal
          visible={manageModalVisible}
          ruleTitle={selectedRule.title}
          onEdit={() => {
            setManageModalVisible(false);
            navigation.navigate('RuleFormScreen', { mode: 'edit', rule: selectedRule });
          }}
          onDelete={() => {
            setRules((prev) => prev.filter((r) => r.id !== selectedRule.id));
            setManageModalVisible(false);
          }}
          onClose={() => setManageModalVisible(false)}
        />
      )}

      <SelectPersonModal
        visible={alarmModalVisible}
        onClose={() => setAlarmModalVisible(false)}
        onSelect={(person) => {
          setSelectedPerson(person);
          setAlarmModalVisible(false);
          setConfirmVisible(true);
        }}
      />

      <ConfirmNotificationModal
        visible={confirmVisible}
        name={selectedPerson || ''}
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          Alert.alert(`${selectedPerson}님에게 알림을 보냈습니다.`);
        }}
      />
    </View>
  );
}

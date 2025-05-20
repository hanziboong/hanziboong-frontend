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
import { useRules, useDeleteRule } from '@/hook/useRules';
import ConfirmModal from '@/components/rules/modal/ConfirmModal';

export default function RulesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data: rules, isLoading, error } = useRules();
  const [manageModalVisible, setManageModalVisible] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [alarmModalVisible, setAlarmModalVisible] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const deleteRule = useDeleteRule();
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
            setManageModalVisible(false);
            setDeleteConfirmVisible(true);
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
        type="alarm"
        visible={confirmVisible}
        name={selectedPerson || ''}
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          setConfirmModalVisible(true);
        }}
      />
      <ConfirmNotificationModal
        type="delete"
        visible={deleteConfirmVisible}
        name={selectedRule?.title || ''}
        onCancel={() => setDeleteConfirmVisible(false)}
        onConfirm={() => {
          setDeleteConfirmVisible(false);
          deleteRule.mutate(selectedRule?.id ?? 0);
          setConfirmDeleteVisible(true);
        }}
      />
      <ConfirmModal
        text={`${selectedPerson}님에게 알림을 보냈습니다.`}
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
      />
      <ConfirmModal
        text={`${selectedRule?.title} 규칙을 삭제했습니다.`}
        visible={confirmDeleteVisible}
        onCancel={() => setConfirmDeleteVisible(false)}
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
}

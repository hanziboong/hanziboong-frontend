// screens/RulesScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Rule } from '@/types/Rule';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  icon: { padding: 8 },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FFB338',
    borderRadius: 50,
    padding: 14,
  },
});

export default function RulesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', title: '휴대폰 사용 금지', description: '회의 중 휴대폰을 사용하지 않습니다.' },
    { id: '2', title: '지각 금지', description: '모임에 늦지 않도록 합니다.' },
  ]);

  const handlePressMore = (rule: Rule) => {
    Alert.alert('규칙 관리', `"${rule.title}"에 대해 어떤 작업을 하시겠습니까?`, [
      {
        text: '수정',
        onPress: () => navigation.navigate('RuleFormScreen', { mode: 'edit', rule }),
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => setRules((prev) => prev.filter((r) => r.id !== rule.id)),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const handlePressAlarm = (rule: Rule) => {
    Alert.alert('알림', `"${rule.title}" 규칙에 대한 푸시 알림이 발송됩니다.`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rules}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.ruleItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{`${index + 1}. ${item.title}`}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePressAlarm(item)} style={styles.icon}>
              <Ionicons name="notifications-outline" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePressMore(item)} style={styles.icon}>
              <Ionicons name="ellipsis-vertical" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>규칙이 없습니다.</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RuleFormScreen', { mode: 'add' })}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

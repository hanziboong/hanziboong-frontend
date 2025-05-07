import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface RuleFormProps {
  isEdit: boolean;
  defaultValues?: { id: string; title: string; description: string };
  onSubmit?: (rule: { title: string; description: string }) => void;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
  },
});

export default function RuleForm({ isEdit, defaultValues, onSubmit }: RuleFormProps) {
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, description });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="규칙 제목"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="설명"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 100 }]}
      />
      <Button title={isEdit ? '수정하기' : '추가하기'} onPress={handleSubmit} />
    </View>
  );
}

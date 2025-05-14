import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from './RuleForm.styles';
import { Rule } from '@/types/Rule';

interface RuleFormProps {
  defaultValues?: Rule;
}

// 외부 컴포넌트로 값을 옮기기 위함
export type RuleFormRef = {
  getValues: () => { title: string; description: string };
};

const RuleForm = forwardRef<RuleFormRef, RuleFormProps>(({ defaultValues }, ref) => {
  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [description, setDescription] = useState(defaultValues?.description ?? '');

  useImperativeHandle(ref, () => ({
    getValues: () => ({
      title,
      description,
    }),
  }));

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="규칙 제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="규칙의 설명을 입력하세요"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 100 }]}
      />
    </View>
  );
});

RuleForm.displayName = 'RuleForm';

export default RuleForm;

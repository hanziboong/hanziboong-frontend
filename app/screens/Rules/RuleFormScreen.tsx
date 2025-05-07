// RuleFormScreen.tsx

import RuleForm from '@/components/rules/RuleForm';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

type RuleFormScreenProps = {
  route: RouteProp<RootStackParamList, 'RuleFormScreen'>;
};

export default function RuleFormScreen({ route }: RuleFormScreenProps) {
  const { mode, rule } = route.params;
  return <RuleForm isEdit={mode === 'edit'} defaultValues={rule} />;
}

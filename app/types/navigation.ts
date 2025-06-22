// types/navigation.ts
import { Rule } from './Rule';

export type RootStackParamList = {
  MainTabs: undefined;
  RuleFormScreen: { mode: 'edit' | 'add'; rule?: Rule };
  ShoppingDetail: undefined;
  ExpenseDetailScreen: { id: number };
  ExpenseFormScreen: { id: number; isEdit: boolean };
};

import instance from './instance';
import { Rule } from '@/types/Rule';

// 규칙 생성
export const createRules = async (rule: Rule) => {
  const response = await instance.post('/api/rules', rule);
  return response.data;
};

// 규칙 불러오기
export const getRules = async () => {
  // TODO : 추후 houseId로 수정 필요
  const response = await instance.get('/api/rules/house/1');
  return response.data;
};

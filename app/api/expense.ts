import instance from './instance';
import { Expense } from '@/types/expense';

// 지출 전체 조회
export const getExpense = async () => {
  // TODO : 추후 houseId로 수정 필요
  const response = await instance.get('/api/expense/house/1');
  return response.data;
};

// 지출 단일 조회
export const getExpenseById = async (id: number) => {
  const response = await instance.get(`/api/expense/${id}`);
  return response.data;
};

// 지출 등록
export const createExpense = async (expense: Expense) => {
  const response = await instance.post('/api/expense', expense);
  return response.data;
};

// 지출 단건 삭제
export const deleteExpense = async (id: number) => {
  const response = await instance.delete(`/api/expense/${id}`);
  return response.data;
};

// 지출 수정
export const updateExpense = async (id: number, expense: Expense) => {
  const response = await instance.patch(`/api/expense/${id}`, expense);
  return response.data;
};

// 개인 정산 유무 상태 변경
export const updateIndividualSettlement = async (id: number, settled: boolean) => {
  const response = await instance.patch(`/api/expense/participant/${id}?isSettled=${settled}`);
  return response.data;
};

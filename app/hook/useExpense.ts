import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as expenseApi from '@/api/expense';

// 지출 전체 조회
export const useExpense = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: expenseApi.getExpense,
    select: (data) => data.content,
  });
};

// 지출 단일 조회
export const useExpenseById = (id: number) => {
  return useQuery({
    queryKey: ['expenses', id],
    queryFn: () => expenseApi.getExpenseById(id),
  });
};

// 지출 등록
export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expenseApi.createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

// 지출 상태 토글
export const useExpenseStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, settled }: { id: number; settled: boolean }) =>
      expenseApi.updateIndividualSettlement(id, settled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

// 지출 삭제
export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => expenseApi.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

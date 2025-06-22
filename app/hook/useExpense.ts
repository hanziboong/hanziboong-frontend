import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import * as expenseApi from '@/api/expense';
import { Expense, ExpenseItemDetail } from '@/types/expense';

// 지출 전체 조회
export const useExpense = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: expenseApi.getExpense,
    select: (data) => data.content,
  });
};

// 지출 단일 조회
export const useExpenseById = (
  id: number,
  options?: Partial<UseQueryOptions<ExpenseItemDetail>>,
) => {
  return useQuery<ExpenseItemDetail>({
    queryKey: ['expenses', id],
    queryFn: () => {
      if (!id) {
        // 방어 코드 추가
        return Promise.reject(new Error('Invalid id: 0'));
      }
      return expenseApi.getExpenseById(id);
    },
    select: (data) => data,
    ...options,
  });
};

// 지출 등록
export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (expense: Expense) => expenseApi.createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};

// 지출 수정
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ expense, id }: { expense: Expense; id: number }) =>
      expenseApi.updateExpense(id, expense),
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

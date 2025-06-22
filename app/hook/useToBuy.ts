import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as toBuyApi from '@/api/toBuy';

// 사야 할 물건 조회
export const useToBuy = () =>
  useQuery({
    queryKey: ['toBuy'],
    queryFn: async () => {
      const data = await toBuyApi.getToBuy();
      return data;
    },
  });

// 사야 할 물건 등록
export const useCreateToBuy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toBuyApi.createToBuy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toBuy'] });
    },
  });
};

// 사야 할 물건 완료 체크
export const useCheckToBuy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toBuyApi.checkToBuy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toBuy'] });
    },
  });
};

// 사야 할 물건 삭제
export const useDeleteToBuy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toBuyApi.deleteToBuy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toBuy'] });
    },
  });
};

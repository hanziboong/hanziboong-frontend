import { useQuery } from '@tanstack/react-query';
import * as ruleApi from '@/api/rule';

import { useMutation, useQueryClient } from '@tanstack/react-query';

// 규칙 불러오기
export const useRules = () =>
  useQuery({
    queryKey: ['rules'],
    queryFn: async () => {
      const data = await ruleApi.getRules();
      // TODO : 추후 정렬 필요할 시 전달
      return data.content;
    },
  });
// 규칙 생성
export const useCreateRule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ruleApi.createRules,
    onSuccess: () => {
      // 캐시 무효화 → 자동 재조회
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });
};

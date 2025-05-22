import * as scheduleApi from '@/api/schedule';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 일정 불러오기
export const useSchedules = (year: number, month: number) => {
  return useQuery({
    queryKey: ['schedules', year, month],
    queryFn: async () => {
      const data = await scheduleApi.getSchedules(year, month);
      return data ?? [];
    },
  });
};

// 일정 등록하기
export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scheduleApi.createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
  });
};

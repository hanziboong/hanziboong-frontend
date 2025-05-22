import * as scheduleApi from '@/api/schedule';
import { Schedule } from '@/types/Schedule';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 일정 불러오기
export const useSchedules = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: scheduleApi.getSchedules,
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

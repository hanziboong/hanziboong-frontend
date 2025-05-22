import { Schedule } from '@/types/Schedule';
import instance from './instance';

// 일정 조회
export const getSchedules = async () => {
  // TODO : 추후 houseId로 수정 필요
  const response = await instance.get('/api/schedules/house/1');
  return response.data;
};

// 일정 등록
export const createSchedule = async (schedule: Schedule) => {
  const response = await instance.post('/api/schedules', schedule);
  return response.data;
};

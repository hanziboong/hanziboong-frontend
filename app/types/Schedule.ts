import { Dayjs } from 'dayjs';

export interface Schedule {
  houseId: number;
  title: string;
  startAt: Dayjs;
  endAt: Dayjs;
  participantUserId: number[];
}

export interface ScheduleDetail extends Schedule {
  id: number;
  color: string;
}

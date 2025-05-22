import { Dayjs } from 'dayjs';

export interface Schedule {
  houseId: number;
  title: string;
  startAt: Dayjs;
  endAt: Dayjs;
  participantUserId: number[];
}

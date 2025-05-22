// hook/buildMarkedDatesFromSchedules.ts
import { ScheduleDetail } from '@/types/Schedule';
import dayjs from 'dayjs';

type Period = {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
};

type MarkedDates = {
  [date: string]: {
    periods: Period[];
    extraCount?: number;
  };
};

const MAX_PERIODS_PER_DAY = 4;

export default function buildMarkedDatesFromSchedules(schedules: ScheduleDetail[]): MarkedDates {
  const layersByDate: Record<string, (Period | null)[]> = {};

  // 긴 일정 먼저 정렬
  const sorted = [...schedules].sort((a, b) => {
    const aDuration = dayjs(a.endAt).diff(dayjs(a.startAt), 'day');
    const bDuration = dayjs(b.endAt).diff(dayjs(b.startAt), 'day');
    return bDuration - aDuration; // 긴 기간 먼저
  });

  // 배치
  sorted.forEach((schedule) => {
    const start = dayjs(schedule.startAt);
    const end = dayjs(schedule.endAt);
    const duration = end.diff(start, 'day') + 1;

    let layerIndex = 0;

    // 빈 줄 찾기
    while (true) {
      let conflict = false;

      for (let i = 0; i < duration; i += 1) {
        const date = start.add(i, 'day').format('YYYY-MM-DD');
        const layers = layersByDate[date] ?? [];

        if (layers[layerIndex]) {
          conflict = true;
          break;
        }
      }

      if (!conflict) break;
      layerIndex += 1;
    }

    // 배치 (limit 상관 없이 다 넣기 - 나중에 제한 적용)
    for (let i = 0; i < duration; i += 1) {
      const currentDate = start.add(i, 'day').format('YYYY-MM-DD');
      const isStart = i === 0;
      const isEnd = i === duration - 1;

      if (!layersByDate[currentDate]) {
        layersByDate[currentDate] = [];
      }

      layersByDate[currentDate][layerIndex] = {
        startingDay: isStart,
        endingDay: isEnd,
        color: schedule.color,
      };
    }
  });

  // 제한 걸고 +N 처리
  const markedDates: MarkedDates = {};

  Object.entries(layersByDate).forEach(([date, layers]) => {
    const filled = layers.filter((item) => item !== null) as Period[];
    const limited = filled.slice(0, MAX_PERIODS_PER_DAY);
    const extraCount =
      filled.length > MAX_PERIODS_PER_DAY ? filled.length - MAX_PERIODS_PER_DAY : 0;

    markedDates[date] = {
      periods: limited,
      ...(extraCount > 0 && { extraCount }), // +N 표시를 위한 키
    };
  });

  return markedDates;
}

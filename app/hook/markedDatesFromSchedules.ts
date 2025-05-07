// hooks/markedDatesFromSchedules.ts

import dayjs from 'dayjs';

type Schedule = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
};

type Period = {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
};

type MarkedDates = {
  [date: string]: {
    periods: Period[];
  };
};

export default function buildMarkedDatesWithFixedLayers(schedules: Schedule[]): MarkedDates {
  const result: Record<string, (Period | undefined)[]> = {};
  const layerMap = new Map<string, number>();
  let maxLayer = 0;

  schedules.forEach((schedule, index) => {
    const start = dayjs(schedule.start);
    const end = dayjs(schedule.end);
    const duration = end.diff(start, 'day') + 1;

    const layer = index;
    layerMap.set(schedule.id, layer);
    maxLayer = Math.max(maxLayer, layer + 1);

    for (let i = 0; i < duration; i += 1) {
      const currentDate = start.add(i, 'day').format('YYYY-MM-DD');

      if (!result[currentDate]) {
        result[currentDate] = Array(maxLayer).fill(undefined);
      }

      while (result[currentDate].length < maxLayer) {
        result[currentDate].push(undefined);
      }

      result[currentDate][layer] = {
        startingDay: i === 0,
        endingDay: i === duration - 1,
        color: schedule.color,
      };
    }
  });

  const markedDates: MarkedDates = {};
  Object.entries(result).forEach(([date, periods]) => {
    markedDates[date] = {
      periods: periods.map((p) => p ?? { color: 'transparent' }),
    };
  });

  return markedDates;
}

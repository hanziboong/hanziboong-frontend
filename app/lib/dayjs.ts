import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
// 플러그인 추가
dayjs.extend(isBetween);

export default dayjs;

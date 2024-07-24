import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function humanize(date: string) {
    dayjs.extend(relativeTime);
    const date1 = dayjs(date); // ini data dari database, created_at / updated_at
    const date2 = dayjs();

    return date1.from(date2);
}

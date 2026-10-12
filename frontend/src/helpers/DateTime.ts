import dayjs from 'dayjs';

export class DateTime {
    static format(date: string): string {
        return dayjs(date).format('DD/MM/YYYY');
    }
};
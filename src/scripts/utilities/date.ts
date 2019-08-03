import * as moment from 'moment';

import { defaultDateFormat } from '@/configs';

export const formatDate = (date: moment.Moment | Date | string | undefined, format: string = defaultDateFormat) => {
    if (!date) {
        return '...';
    }

    if (moment.isMoment(date)) {
        return date.format(format);
    }

    const dateMoment = moment(date);
    
    return dateMoment.format(format);
};

export const getNextsDaysRange = (days: number): [moment.Moment, moment.Moment] => {
    return [moment(), moment().add( days, 'days')];
};

export const getPreviousDaysRange = (days: number): [moment.Moment, moment.Moment] => {
    return [moment().add( - days, 'days'), moment()];
};

export const startAndEndOfTime = (
    date?: Date | moment.Moment,
    unitOfTime: moment.unitOfTime.StartOf = 'month'
): [moment.Moment, moment.Moment] => {
    const _date = date || new Date;

    return [moment(_date).startOf(unitOfTime), moment(_date).endOf(unitOfTime)];
};

export const isFutureDate = (currentMoment: moment.Moment) => {
    const today = new Date();
    const currentMomentDate = currentMoment.toDate();
    if (today < currentMomentDate) {
        return true;
    }

    return false;
};

export const daysBetween = function (date1: Date, date2: Date): number {
    const oneDay = 1000 * 60 * 60 * 24;

    const date1MS = date1.getTime();
    const date2MS = date2.getTime();

    const differenceMS = date1MS - date2MS;

    return Math.round(differenceMS / oneDay);
};

export const isToday = (date: Date | string) => {
    const now = new Date;
    const target = moment.isDate(date) ? date : new Date(date);

    return now.toDateString() === target.toDateString();
};

export const isDayEqualDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
};
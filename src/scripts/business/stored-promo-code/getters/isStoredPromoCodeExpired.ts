import * as moment from 'moment';

import { StoredPromoCode } from '@/restful';
import { isFutureDate } from '@/utilities';

export const isStoredPromoCodeExpired = (storedPromoCode: StoredPromoCode) => {
    return !isFutureDate(
        moment(storedPromoCode.expiredAt)
    );
};
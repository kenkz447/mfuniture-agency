import { StoredPromoCode } from '@/restful';
import { isFutureDate } from '@/utilities';

export const isStoredPromoCodeExpired = (storedPromoCode: StoredPromoCode) => {
    return !isFutureDate(storedPromoCode.expiredAt);
};
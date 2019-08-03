import { StoredPromoCode } from '@/restful';

export const isStoredPromoCodeUsed = (storedPromoCode: StoredPromoCode) => {
    return !!storedPromoCode.usedAt;
};
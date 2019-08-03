import { User } from '@/restful';

export const isUserNeedsUpdateBusinessInfo = (user?: User) => {
    if (!user) {
        return false;
    }
    
    if (user.role.name! === 'Registered') {
        return !user.registration_businessAreas
            || !user.registration_companyName
            || !user.registration_companyAddress;
    }

    return false;
};
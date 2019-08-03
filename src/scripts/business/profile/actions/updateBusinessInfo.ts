import { profileResources, request, User } from '@/restful';

export const updateBusinessInfo = (user: Partial<User>) => {
    return request(
        profileResources.updateBusinessInfo,
        { type: 'body', value: user }
    );
};
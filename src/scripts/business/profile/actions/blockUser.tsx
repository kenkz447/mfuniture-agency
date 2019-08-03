import { profileResources, request, User } from '@/restful';

export const blockUser = (user: User) => {
    return request(profileResources.blockUser, { type: 'body', value: user });
};
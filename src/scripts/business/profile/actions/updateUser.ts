import { request, User } from '@/restful';
import { profileResources } from '@/restful/resources/profile';

export const updateUser = (user: Partial<User>) => {
    return request(profileResources.updateUser, { type: 'body', value: user });
};
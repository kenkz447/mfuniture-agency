import { authResources, request, User } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const registerUser = (newUser: Partial<User>) => {

    return request(
        authResources.register,
        {
            type: 'body',
            value: {
                ...newUser,
                username: genCodeWithCurrentDate('TK'),
                registrationDate: new Date
            }
        }
    );
};
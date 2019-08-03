import { User } from '@/restful';

export const getUserFirstName = (user: User) => {

    if (!user.fullName) {
        return user.username;
    }

    const fullnameSplited = user.fullName.trim().split(' ');

    return fullnameSplited[fullnameSplited.length - 1];
};
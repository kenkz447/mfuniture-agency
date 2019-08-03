import { Invitation, invitationResources, request } from '@/restful';

export const createInvitation = (invitation: Partial<Invitation>) => {
    const body: Partial<Invitation> = {
        ...invitation
    };

    return request(
        invitationResources.create,
        {
            type: 'body',
            value: body
        });
};
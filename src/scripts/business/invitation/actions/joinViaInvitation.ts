import {
    InvitationJoinRequestBody,
    invitationResources,
    request
} from '@/restful';

export const joinViaInvitation = (invitation: Partial<InvitationJoinRequestBody>) => {
    if (!invitation.invitationId) {
        throw 'WTF??';
    }

    return request(
        invitationResources.join,
        [
            {
                type: 'path',
                parameter: 'inviationId',
                value: invitation.invitationId
            },
            {
                type: 'body',
                value: invitation
            }
        ]
    );
};
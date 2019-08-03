import { WithCurrentUser } from '@/domain';
import {
    IssueTicket,
    IssueTicketReply,
    issueTicketReplyResources,
    request
} from '@/restful';

export const createIssueTicketReply = (
    ticketReply: Partial<IssueTicket>,
    context: WithCurrentUser
) => {
    const { currentUser } = context;

    const body: Partial<IssueTicketReply> = {
        ...ticketReply,
        authorName: currentUser.fullName
    };

    return request(
        issueTicketReplyResources.create,
        {
            type: 'body',
            value: body
        });
};
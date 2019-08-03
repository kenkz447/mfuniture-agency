import { IssueTicket, issueTicketResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const closeIssueTicket = (ticket: IssueTicket) => {
    return request(
        issueTicketResources.close,
        {
            type: 'body',
            value: ticket
        });
};
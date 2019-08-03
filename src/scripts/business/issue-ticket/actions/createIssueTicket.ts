import { DomainContext } from '@/domain';
import { IssueTicket, issueTicketResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const createIssueTicket = (
    ticket: Partial<IssueTicket>,
    context: DomainContext
) => {
    const { currentAgency } = context;
    
    const body: Partial<IssueTicket> = {
        ...ticket,
        openDate: new Date(),
        code: genCodeWithCurrentDate(),
        issueTicketAgency: currentAgency
    };

    return request(
        issueTicketResources.create,
        {
            type: 'body',
            value: body
        });
};
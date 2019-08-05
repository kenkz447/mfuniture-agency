import { WithDomainContext } from '@/domain';
import { IssueTicket, issueTicketResources, request } from '@/restful';
import { genCodeWithCurrentDate } from '@/utilities';

export const createIssueTicket = (
    ticket: Partial<IssueTicket>,
    context: WithDomainContext
) => {
    const { curentAgency } = context;
    
    const body: Partial<IssueTicket> = {
        ...ticket,
        openDate: new Date(),
        code: genCodeWithCurrentDate(),
        issueTicketAgency: curentAgency
    };

    return request(
        issueTicketResources.create,
        {
            type: 'body',
            value: body
        });
};
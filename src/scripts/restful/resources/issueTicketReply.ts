import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

import { IssueTicket, issueTicketSchema } from './issueTicket';
import { User, userSchema } from './user';

export interface IssueTicketReply {
    readonly id?: string;
    readonly content: string;
    readonly authorName: string;
    readonly created_by: User;
    readonly issueTicket: IssueTicket;
    readonly createdAt: string;
}

export const issueTicketReplySchema = yup.object().shape<IssueTicketReply>({
    content: yup.string().required(),
    authorName: yup.string().required(),
    createdAt: yup.string(),
    id: yup.string(),
    created_by: userSchema.required(),
    issueTicket: issueTicketSchema
});

export const issueTicketReplyResourceType = new ResourceType<IssueTicketReply>({
    name: nameof<IssueTicketReply>()
});

export const issueTicketReplyResources = {
    find: new Resource<IssueTicketReply, IssueTicketReply[]>({
        resourceType: issueTicketReplyResourceType,
        url: '/issueTicketReplies'
    }),
    findOne: new Resource<IssueTicketReply>({
        resourceType: issueTicketReplyResourceType,
        url: '/issueTicketReplies/:id'
    }),
    create: new Resource<IssueTicketReply>({
        resourceType: issueTicketReplyResourceType,
        url: '/issueTicketReplies',
        method: 'POST',
        bodySchema: issueTicketReplySchema
    })
};
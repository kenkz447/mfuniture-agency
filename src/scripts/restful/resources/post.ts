import { Resource, ResourceType } from 'react-restful';

import { getDefaultParamsForUpdate } from '../base';
import { UploadedFile } from './uploadedFile';

export type PostType = 'apartment' | 'home';

export interface Post {
    readonly id: string;
    readonly title: string;
    readonly slug: string;
    readonly brief: string;
    readonly content: string;
    readonly thumbnail?: UploadedFile;
    readonly updatedAt?: string;
}

export interface PostSendToMailsRequestBody {
    readonly id: string;
    readonly targetRoleNames: string[];
    readonly subject: string;
    readonly preHeader: string;
    readonly imgSrc: string;
    readonly title: string;
    readonly content: string;
    readonly postUrl: string;
}

export const postResourceType = new ResourceType<Post>(nameof<Post>());

export const postResources = {
    find: new Resource<Post, Post[]>({
        resourceType: postResourceType,
        url: '/posts',
        getDefaultParams: () => [{
            type: 'query',
            parameter: '_sort',
            value: 'id:DESC'
        }, {
            type: 'query',
            parameter: 'public',
            value: true
        }]
    }),
    findOne: new Resource<Post>({
        resourceType: postResourceType,
        url: '/posts/:id'
    }),
    create: new Resource<Post>({
        resourceType: postResourceType,
        url: '/posts',
        method: 'POST'
    }),
    update: new Resource<Post>({
        resourceType: postResourceType,
        url: '/posts/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
    delete: new Resource<Post>({
        resourceType: postResourceType,
        url: '/posts/:id',
        method: 'DELETE'
    }),
    sendToMails: new Resource<PostSendToMailsRequestBody>({
        url: '/posts/send-to-mails/:id',
        method: 'PUT',
        getDefaultParams: getDefaultParamsForUpdate
    }),
};
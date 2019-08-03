import { postResources, PostSendToMailsRequestBody, request } from '@/restful';

export const sendPostToMails = (body: PostSendToMailsRequestBody) => {
    return request(
        postResources.sendToMails,
        {
            type: 'body',
            value: body
        }
    );
};
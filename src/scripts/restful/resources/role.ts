import { Resource, ResourceType } from 'react-restful';
import * as yup from 'yup';

export type RoleType = 'root' | 'authenticated';

export interface Role {
    readonly id: string;
    readonly description: string;
    readonly name: string;
    readonly type: RoleType;
}

export const roleSchema = yup.object<Role>().shape({
    description: yup.string(),
    id: yup.string().required(),
    name: yup.string().required(),
    type: yup.mixed().oneOf(['root', 'authenticated'] as RoleType[])
});

export const roleResourceType = new ResourceType<Role>({
    name: nameof<Role>(),
    keyProperty: '_id'
});

export const roleResources = {
    find: new Resource<Role, { readonly roles: Role[] }>({
        resourceType: roleResourceType,
        url: '/users-permissions/roles',
        mapDataToStore: (result, type,store) => {
            store.dataMapping(type, result.roles);
        }
    })
};
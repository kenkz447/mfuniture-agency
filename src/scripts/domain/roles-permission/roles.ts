import { Role } from 'qoobee';

import { permissions } from './permissions';

const authenticated: Role = {
    key: 'authenticated',
    defaultUrl: '/',
    allowed: [
        permissions.ALL
    ]
};

export const roles = [
    authenticated
];
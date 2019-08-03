import { Policy } from 'qoobee';

import { WithDomainContext } from './base';

export const locationAllowed: Policy = (context: WithDomainContext) => {
    const { history, currentRole } = context;
    
    if (!currentRole) {
        return false;
    }

    return !!currentRole.allowed.find(o => o.url && o.url.test(history.location.pathname));
};

export const functionAllowed: Policy = (context: WithDomainContext, funcKey: string) => {
    return true;
};
import { createTranslatior } from 'qoobee';

import { translationResources } from './availableLanguages';

export const text = createTranslatior({ resources: translationResources });
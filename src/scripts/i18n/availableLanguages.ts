import { en, vi } from './translation';

export const translationResources = {
    en,
    vi
};

export type AvailableLanguage = keyof typeof translationResources;

export const availableLanguages: {
    readonly name: AvailableLanguage,
    readonly label: string,
    readonly symbol: string
}[] = [
        { name: 'en', label: 'English', symbol: '🇬🇧' },
        { name: 'vi', label: 'Vietnamese', symbol: '🇻🇳' }
    ];
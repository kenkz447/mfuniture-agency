import { tokenKey } from '@/configs';

const cookies = require('js-cookie');

export interface CookiesOption {
    readonly expires?: Date | number;
    readonly path?: string;
    readonly domain?: string;
    readonly secure?: boolean;
}

export const getToken = (): string | null => {
    const tokenFormCookies = cookies.get(tokenKey);
    
    return tokenFormCookies || null;
};

export const saveToken = (token: string, cookiesOption?: CookiesOption) => {
    cookies.set(tokenKey, token, cookiesOption);
};

export const clearToken = () => {
    cookies.remove(tokenKey);
};
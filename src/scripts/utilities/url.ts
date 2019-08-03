export const getUrlSearchParam = (key: string) => {
    const currentUrlParams = new URLSearchParams(location.search);

    return currentUrlParams.get(key);
};

export const getSearchParamsObj = () => {
    const search = location.search;
    const params = new URLSearchParams(search);
    const paramObj = {};
    const allParamKeys = params.keys();

    for (const paramKey of allParamKeys) {
        paramObj[paramKey] = params.get(paramKey);
    }

    return paramObj;
};

export const searchParamsObject = <T>(query?: string): T => {
    const currentUrlParams = query ? new URLSearchParams(query) : new URLSearchParams(location.search);
    const searchParamsEntries = currentUrlParams.entries();
    const search = Array.from(searchParamsEntries);
    const result = search.reduce(
        (currentResult, item) => {
            const key = item[0];
            const value = item[1];

            return Object.assign({ [key]: value }, currentResult);
        },
        {}
    );

    return result as T;
};

export const objectToSearchParams = (object: object) => {
    const newSearch = new URLSearchParams();
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key]) {
                newSearch.set(key, object[key]);
            } else {
                newSearch.delete(key);
            }
        }
    }

    return newSearch;
};

export const redirect = (uri) => {
    if (navigator.userAgent.match(/Android/i)) {
        document.location = uri;
    } else {
        window.location.replace(uri);
    }
};

export const replaceRoutePath = (path: string, obj: {} = {}, searchParams?: URLSearchParams | string) => {
    const replacedPath = Object.keys(obj).reduce(
        (url, key) => {
            const regex = new RegExp(`:${key}`, 'g');

            return url.replace(regex, obj[key]);
        },
        path
    );

    return replacedPath + (searchParams ? searchParams.toString() : '');
};

export const getSubDomain = (host: string, domain: string) => {
    if (host.includes('localhost')) {
        return null;
    }

    return host.replace('.' + domain, '');
};
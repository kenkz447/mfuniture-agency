import { ImgSize, UploadedFile } from '@/restful';

const getDefaultImgSrc = () => `/static/assets/no-image.png`;

const addHostToPath = (url: string) => {
    if (url.startsWith('/uploads')) {
        return `${FILE_HOST}${url}`;
    }

    return url;
};

export const getUploadedFileSrc = (props: {
    readonly uploadedFile?: UploadedFile | string;
    readonly size?: ImgSize;
}) => {
    const { uploadedFile, size } = props;

    if (!uploadedFile) {
        return getDefaultImgSrc();
    }

    if (typeof uploadedFile === 'string') {
        if (uploadedFile.startsWith('/uploads')) {
            return addHostToPath(uploadedFile);
        } 

        return uploadedFile;
    }

    if (size) {
        const fileUrl = uploadedFile[size];
        if (fileUrl) {
            return addHostToPath(fileUrl);
        }
    }

    // to fix some time url start with http://localhost:1337/...
    const url = (uploadedFile.url && uploadedFile.url.startsWith('http://')) ?
        (new URL(uploadedFile.url)).pathname :
        uploadedFile.url;

    return addHostToPath(url);
};
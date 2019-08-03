import * as React from 'react';

import { getUploadedFileSrc } from '@/business/uploaded-file';
import { ImgSize, UploadedFile } from '@/restful';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file?: UploadedFile | string;
    readonly size?: ImgSize;
}

export class Img extends React.Component<ImgProps> {
    public render() {
        const { file, size, ...rest } = this.props;
        const imgSrc = getUploadedFileSrc({ uploadedFile: file, size });

        return <img {...rest} src={imgSrc} />;
    }
}
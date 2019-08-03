import { UploadedFile } from './uploadedFile';

export interface ProductionCodeEntity {
    readonly id: string;
    readonly code: string;
    readonly name: string;
    readonly thumbnail?: UploadedFile;
}
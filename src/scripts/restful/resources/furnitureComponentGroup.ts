import { Resource, ResourceType } from 'react-restful';

import { FurnitureComponent } from './furnitureComponent';
import { UploadedFile } from './uploadedFile';

export interface FurnitureComponentGroup {
    readonly id: string;
    readonly name: string;
    readonly displayName?: string;
    readonly components: FurnitureComponent[];
    readonly productSize?: string;
    readonly packagingSize?: string;
    readonly weight?: number;
    readonly mattressMaterial?: string;
    readonly foamType?: string;
    readonly sittingSurfaceSize?: string;
    readonly handHeight?: number;
    readonly legHeight?: number;
    readonly sittingHeight?: number;
    readonly photos: UploadedFile[];
    readonly view_senceHeight?: number;
    readonly view_cameraFar?: number;
    readonly model3D?: UploadedFile;
}

export const furnitureComponentGroupResourceType = new ResourceType<FurnitureComponentGroup>(
    nameof<FurnitureComponentGroup>()
);

export const furnitureComponentGroupResources = {
    findById: new Resource<FurnitureComponentGroup>({
        resourceType: furnitureComponentGroupResourceType,
        url: '/componentgroups/:id'
    })
};
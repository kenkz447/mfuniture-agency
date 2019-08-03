import { Record, Resource, ResourceType } from 'react-restful';

import { FurnitureComponent } from './furnitureComponent';

export interface FurnitureComponentType {
    readonly id: string;
    readonly name: string;
    readonly components: FurnitureComponent[];
    readonly position?: 'default' | 'leg' | 'top' | 'seat';
    readonly isBase?: boolean;
    readonly sittingSurfaceSize?: string;
}

export const furnitureComponentTypeResourceType = new ResourceType<FurnitureComponentType>(
    nameof<FurnitureComponentType>()
);

export const furnitureComponentTypeResources = {
    find: new Resource<FurnitureComponentType, FurnitureComponentType[]>({
        resourceType: furnitureComponentTypeResourceType,
        url: '/componenttype'
    })
};
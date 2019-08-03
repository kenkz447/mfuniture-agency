import { Resource, ResourceType } from 'react-restful';

import { ProductDesign } from './productDesign';
import { ProductType } from './productType';
import { ProductTypeGroup } from './productTypeGroup';
import { UploadedFile } from './uploadedFile';

export interface Catalog {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly moduleCodes: string;
    readonly recommendedPrice: number;
    readonly published: boolean;
    readonly thumbnail: UploadedFile;
    readonly productTypeGroup: ProductTypeGroup;
    readonly productType: ProductType;
    readonly design: ProductDesign;
    readonly photos: UploadedFile[];
    readonly isNewProduct?: boolean;
    readonly model3D?: UploadedFile;
}

export const catalogResourceType = new ResourceType<Catalog>({
    name: nameof<Catalog>()
});

export const catalogResources = {
    find: new Resource<Catalog, Catalog[]>({
        resourceType: catalogResourceType,
        url: '/catalog',
        getDefaultParams: () => [{
            parameter: nameof<Catalog>(o => o.published),
            type: 'query',
            value: true
        }, {
            type: 'query',
            parameter: '_sort',
            value: 'viewOrder:DESC,isNewProduct:DESC,id:DESC'
        }]
    }),
    findOne: new Resource<Catalog>({
        resourceType: catalogResourceType,
        url: '/catalog/:id'
    }),
    findOneByCode: new Resource<Catalog>({
        resourceType: catalogResourceType,
        url: '/catalog/code/:code',
        getDefaultMeta: () => ({ silent: true })
    })
};
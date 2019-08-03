import {
    FurnitureComponent,
    furnitureComponentResources,
    furnitureComponentResourceType,
    ProductDesign,
    request,
    restfulStore
} from '@/restful';

export const getFurnitureComponentByDesign = async (productDesignObj: ProductDesign | string) => {
    const productDesignId = typeof productDesignObj === 'string' ? productDesignObj : productDesignObj.id;

    let productComponentTypes = restfulStore.findManyRecords(
        furnitureComponentResourceType,
        (productComponentType) => {
            if (typeof productComponentType.design === 'string') {
                return productComponentType.design === productDesignId;
            }

            return productComponentType.design.id === productDesignId;
        }
    );

    if (productComponentTypes.length) {
        return productComponentTypes;
    }

    productComponentTypes = await request(
        furnitureComponentResources.find,
        {
            type: 'query',
            parameter: nameof<FurnitureComponent>(o => o.design),
            value: productDesignId
        });
    
    return productComponentTypes;
};
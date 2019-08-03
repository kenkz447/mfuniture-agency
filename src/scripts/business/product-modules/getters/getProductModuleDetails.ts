import { ProductModule } from '@/restful';

export const getProductModuleDetails = (productModules: ProductModule[] | null) => {
    if (!productModules) {
        return {};
    }

    const diameter = productModules.find(o => o.component.diameter !== null);
    const height = productModules.find(o => o.component.height !== null);
    const lengthiness = productModules.find(o => o.component.lengthiness !== null);

    return {
        diameter: diameter && diameter.component.diameter,
        height: height && height.component.height,
        lengthiness: lengthiness && lengthiness.component.lengthiness
    };
};
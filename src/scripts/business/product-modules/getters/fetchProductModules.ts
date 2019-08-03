import { getFurnitureComponentByCode } from '@/business/furniture-component';
import { getFurnitureMaterialByCode } from '@/business/furniture-material';

import {
    getProductModulesComponentCodes
} from './getProductModulesComponentCodes';
import { getProductModulesFromRaw } from './getProductModulesFromRaw';
import {
    getProductModulesMaterialCodes
} from './getProductModulesMaterialCodes';

export const fetchProductModules = async (modulesCode: string) => {
    const componentCodes = getProductModulesComponentCodes(modulesCode);
    const materialCodes = getProductModulesMaterialCodes(modulesCode);

    const componentsMaterials = await Promise.all([
        Promise.all(componentCodes.map((code) =>
            getFurnitureComponentByCode(code)
        )),
        Promise.all(materialCodes.map((code) =>
            getFurnitureMaterialByCode(code)
        ))
    ]);

    const componentList = componentsMaterials[0];
    const materialList = componentsMaterials[1];

    const productModules = componentList.map((component, index) =>
        getProductModulesFromRaw({
            component: component,
            material: materialList[index]
        })
    );

    return productModules;
};
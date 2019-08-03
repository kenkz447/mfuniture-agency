import {
    FurnitureComponent,
    FurnitureMaterial,
    ProductModule
} from '@/restful';

export const getProductModulesFromRaw = (props: {
    readonly component: FurnitureComponent;
    readonly material: FurnitureMaterial;
}): ProductModule => {
    
    const { component, material } = props;

    return {
        component: component,
        componentPrice: component.price || 0,
        material: material,
        materialPrice: material.price || 0
    };
};
import {
    FurnitureComponentGroup,
    ProductDesign,
    ProductExtended,
    ProductModule,
    ProductType
} from '@/restful';

const getSeatInfo = (
    modules: ProductModule[],
    productType: ProductType,
    design: ProductDesign,
    selectedFurnitureComponentGroup?: FurnitureComponentGroup
) => {
    const seatModule = modules.find(o => {
        if (typeof o.component.componentType === 'string') {
            return false;
        }

        return o.component.componentType.position === 'seat';
    });

    if (!seatModule) {
        return null;
    }

    const { material, component } = seatModule;

    return [
        {
            group: 'Material',
            title: 'Vật liệu bọc',
            value: material.materialType && material.name
        },
        {
            group: 'Material',
            title: 'Chất liệu nệm',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup.mattressMaterial
                : productType.mattressMaterial
        },
        {
            group: 'Material',
            title: 'Loại foam',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup.foamType
                : productType.foamType,
        },
        {
            group: 'Size',
            title: 'Chiều cao tay (mm)',
            value: component.handHeight
                || (selectedFurnitureComponentGroup && selectedFurnitureComponentGroup.handHeight)
                || design.handHeight,
        },
        {
            group: 'Size',
            title: 'Chiều cao ngồi (mm)',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup.sittingHeight
                : ''
        }
    ];
};

const getLegsInfo = (
    modules: ProductModule[],
    selectedFurnitureComponentGroup?: FurnitureComponentGroup
) => {

    const legModules = modules.find(o => {
        if (typeof o.component.componentType === 'string') {
            return false;
        }

        return o.component.componentType.position === 'leg';
    });

    if (!legModules) {
        return null;
    }

    const { material, component } = legModules;

    return [
        {
            group: 'Material',
            title: 'Vật liệu chân',
            value: material.materialType && material.name
        },
        {
            group: 'Size',
            title: 'Chiều cao chân (mm)',
            value: component.displayHeight
                || component.height
                || (selectedFurnitureComponentGroup && selectedFurnitureComponentGroup!.legHeight)
        }
    ];
};

const getTopInfo = (
    modules: ProductModule[]
) => {

    const legModules = modules.find(o => {
        if (typeof o.component.componentType === 'string') {
            return false;
        }

        return o.component.componentType.position === 'top';
    });

    if (!legModules) {
        return null;
    }

    const { material, component } = legModules;

    return [
        {
            group: 'Material',
            title: 'Vật liệu mặt bàn',
            value: material.materialType && material.name
        },
        {
            group: 'Size',
            title: 'Đường kính mặt bàn (mm)',
            value: component.diameter
        }
    ];
};

export const getProductDetails = (
    product: ProductExtended,
    selectedFurnitureComponentGroup?: FurnitureComponentGroup
) => {
    
    if (!selectedFurnitureComponentGroup) {
        const selectComponent = product.modules.find(o => !!o.component.componentGroup);
        selectedFurnitureComponentGroup = selectComponent
            ? selectComponent.component.componentGroup as FurnitureComponentGroup
            : undefined;
    }

    const common = [
        {
            group: 'Size',
            title: 'Kích thước tổng thể WxDxH (mm)',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup.productSize
                : null
        },
        {
            group: 'Packaging',
            title: 'Kích thước bao bì (mm)',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup.packagingSize
                : null
        },
        {
            group: 'Packaging',
            title: 'Trọng lượng (kg)',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup.weight
                : null
        },
        {
            group: 'Size',
            title: 'Kích thước nệm ngồi (mm)',
            value: selectedFurnitureComponentGroup
                ? selectedFurnitureComponentGroup!.sittingSurfaceSize
                : ''
        }
    ];

    const leg = getLegsInfo(
        product.modules,
        selectedFurnitureComponentGroup,
    );

    const top = getTopInfo(
        product.modules,
    );

    const seat = getSeatInfo(
        product.modules,
        product.productType,
        product.design,
        selectedFurnitureComponentGroup
    );

    let details = [
        ...common,
        ...top /**   */ || [],
        ...seat /**  */ || [],
        ...leg /**   */ || []
    ];

    details = details.sort((item1, item2) => {
        const title1 = item1.title.toUpperCase();
        const title2 = item2.title.toUpperCase();
        return (title1 < title2) ? -1 : (title1 > title2) ? 1 : 0;
    });

    return details
        .filter(o => !!o.value)
        .map(o => ({
            group: o.group,
            label: o.title,
            value: o.value
        }));
};
import { ProductModule } from '@/restful';

export const getProductModulesPrice = (props: {
    readonly productModules: ProductModule[];
    readonly startPrice: number;
}) => {
    const {
        productModules,
        startPrice = 0
    } = props;

    const reducer = (currentTotalPrice: number, currentModule: ProductModule) => {
        const materialPrice = currentModule.component.materialNorm
            ? currentModule.component.materialNorm * currentModule.materialPrice
            : 0;

        currentTotalPrice += currentModule.componentPrice + materialPrice;

        return currentTotalPrice;
    };

    return productModules.reduce(reducer, startPrice);
};
import { ProductModule } from '@/restful';

export const getProductModuleCodes = (productModules: ProductModule[]) => {
    return productModules.reduce(
        (codes, productModule, index) => {
            codes += productModule.component.code + '-' + productModule.material.code;

            if (index !== productModules.length - 1) {
                codes += '-';
            }

            return codes;
        },
        ''
    );
};
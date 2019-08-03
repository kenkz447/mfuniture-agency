import { ProductDesign } from './productDesign';

export interface ProductDesignGroup {
    readonly id: string;
    readonly name: string;
    readonly productDesigns: ProductDesign[];
    readonly order?: number;
}
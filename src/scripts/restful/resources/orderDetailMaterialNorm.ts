import { User } from 'firebase';

import { FurnitureComponent } from './furnitureComponent';
import { FurnitureMaterial } from './furnitureMaterial';
import { OrderDetail } from './orderDetail';

export interface OrderDetailMaterialNorm {
    readonly id: string;
    readonly singleComponentNorms: number;
    readonly totalNorms: number;
    readonly isExternal: boolean;
    readonly isProvided: boolean;
    readonly productMaterial: FurnitureMaterial;
    readonly productMaterialName: string;
    readonly componentMaterial: FurnitureComponent;
    readonly created_by: User;
    readonly orderDetail: OrderDetail[];
}
import { OrderDetail } from '@/restful';

interface OrderDetailNormsTotal {
    _materialId: string;
    _materialName: string;
    _totalNorms: number;
}

export const getOrderDetailsMaterialNorms = (orderDetails: OrderDetail[], externalOnly = true) => {
    const norms: OrderDetailNormsTotal[] = [];

    for (const orderDetail of orderDetails) {
        orderDetail.orderDetailMaterialNorms.forEach(orderDetailMaterialNorm => {
            if (externalOnly && !orderDetailMaterialNorm.isExternal) {
                return;
            }
            
            const existingNorm = norms.find(
                orderDetailNormsTotal => orderDetailNormsTotal._materialId === orderDetailMaterialNorm.id
            );
            
            if (existingNorm) {
                existingNorm._totalNorms = existingNorm._totalNorms + orderDetailMaterialNorm.totalNorms;
                return;
            }

            norms.push({
                // tslint:disable-next-line:no-any
                _materialId: orderDetailMaterialNorm.productMaterial as any,
                _materialName: orderDetailMaterialNorm.productMaterialName,
                _totalNorms: orderDetailMaterialNorm.totalNorms
            });
        });
    }

    return norms;
};
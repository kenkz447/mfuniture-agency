import { Order } from '@/restful';

export const getOrderTransportFee = (order: Partial<Order>) => {
    const { orderDetails, shippingToCity } = order;

    if (!orderDetails || !shippingToCity) {
        return null;
    }

    const totalVolume = orderDetails.reduce(
        (totalVolumeValue, orderDetail) => {
            if (typeof orderDetail.product_type === 'string') {
                return 0;
            }
            const orderDetailVolume = orderDetail.product_type.volume * orderDetail.quantity;
            return totalVolumeValue += (orderDetailVolume || 0);
        },
        0
    );

    const flatTransportFee = shippingToCity ? shippingToCity.transportFee : 0;
    const totalTransportFee = Math.ceil(totalVolume * flatTransportFee);
    const lastThreeNumber = (totalTransportFee % 1000);
    const result = totalTransportFee - lastThreeNumber;
    
    return {
        total: result,
        totalVolume: totalVolume
    };
};
export const getAllOrderStatus = () => {
    return [
        { value: 'new', title: 'Mới' },
        { value: 'confirmed', title: 'Đã xác nhận' },
        { value: 'produce', title: 'Đã sản suất' },
        { value: 'payment', title: 'Đợi thanh toán' },
        { value: 'shipping', title: 'Đang chuyển hàng' },
        { value: 'done', title: 'Hoàn thành' }
    ];
};
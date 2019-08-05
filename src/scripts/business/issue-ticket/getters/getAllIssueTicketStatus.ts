export const getAllIssueTicketStatus = () => {
    return [
        { title: 'Mới', value: 'open' },
        { title: 'Đang xử lý', value: 'processing' },
        { title: 'Đã đóng', value: 'close' }
    ];
};
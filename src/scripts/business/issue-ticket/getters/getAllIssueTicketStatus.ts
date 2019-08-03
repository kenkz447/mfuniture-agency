import { OptionProps } from 'antd/lib/select';

export const getAllIssueTicketStatus = (): OptionProps[] => {
    return [
        { title: 'Mới', value: 'open' },
        { title: 'Đang xử lý', value: 'processing' },
        { title: 'Đã đóng', value: 'close' }
    ];
};
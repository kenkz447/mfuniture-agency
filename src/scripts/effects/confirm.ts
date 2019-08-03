
export type ConfirmType = 'warning' | 'danger';

export const confirm = (
    title: string = 'Xác nhận?',
    content: string = 'Lưu ý, hành động này không thể hoàn tác!',
    type: ConfirmType = 'danger'
) => {
    return new Promise((resolve) => {
        resolve(true);
    });
};
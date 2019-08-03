export const wait = (miliSeconds: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, miliSeconds);
    });
};
export const getProductModulesComponentCodes = (productModulesCode?: string) => {
    if (!productModulesCode) {
        return [];
    }

    const codes = productModulesCode.split('-');

    let componentCodes: string[] = [];

    for (let index = 0; index < codes.length; index++) {
        const code = codes[index];
        if (index % 2 !== 0) {
            continue;
        }

        componentCodes.push(code);
    }
    
    return componentCodes;
};
export const getProductModulesMaterialCodes = (productModulesCode: string) => {
    if (!productModulesCode) {
        return [];
    }

    const codes = productModulesCode.split('-');

    let materialCodes: string[] = [];

    for (let index = 0; index < codes.length; index++) {
        const code = codes[index];
        if (index % 2 === 0) {
            continue;
        }

        materialCodes.push(code);
    }
    
    return materialCodes;
};
const replace = require('lodash/replace');

export function roundTo(value: number, digits: number) {
    if (digits === undefined) {
        digits = 0;
    }

    const multiplicator = Math.pow(10, digits) || 1;
    value = parseFloat((value * multiplicator).toFixed(11));
    const test = (Math.round(value) / multiplicator);
    
    return +(test.toFixed(digits));
}

interface FormatCurrencyParam {
    readonly amount: number;
    readonly sourceCurrency: string;
    readonly rate: number;
}

export function formatCurrency(value?: number | FormatCurrencyParam) {
    if (!value) {
        return '0';
    }
    
    let amount: number;
    let sourceCurrency: string;
    let rate: number;

    let formated = '';

    if (typeof value === 'number') {
        amount = Math.round(value);
        sourceCurrency = '';
        rate = 1;
    } else {
        amount = Math.round(value.amount);
        sourceCurrency = value.sourceCurrency;
        rate = value.rate;
    }

    if (!amount) {
        formated = `0 ${sourceCurrency}`;
    }

    if (sourceCurrency) {
        amount = roundTo(amount / rate, 1);
    } else {
        sourceCurrency = '';
    }

    formated = `${replace(amount, /(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ${sourceCurrency}`;

    return formated.trim();
}
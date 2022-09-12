export function cents_to_dollar (amount: number) {
    if (typeof amount !== 'number') {
        throw new Error('Amount passed must be of type Number.')
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return formatter.format(amount/100);
}

export const arrayHasIndex = (array: Array<any>, index: number) => Array.isArray(array) && array.hasOwnProperty(index);

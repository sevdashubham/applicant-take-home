export function cents_to_dollar(amount: number): string {
    if (typeof amount !== 'number') {
        throw new Error('Amount passed must be of type Number.');
    }

    const formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        minimumFractionDigits: 2,
        style: 'currency',
    });

    return formatter.format(amount / 100);
}

export const arrayHasIndex = (array: Array<any>, index: number): boolean =>
    Array.isArray(array) && array.hasOwnProperty(index);

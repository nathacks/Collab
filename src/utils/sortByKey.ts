export const sortByKey = <T>(items: T[], key: keyof T) => {
    return [...items].sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
        }
        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return valueA - valueB;
        }
        return 0;
    });
};

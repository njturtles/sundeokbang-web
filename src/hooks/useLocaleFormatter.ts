export const useLocaleFormatter = (locales: string) => {
    const formatter = (num: number) => {
        return num.toLocaleString(locales);
    };

    return formatter;
};

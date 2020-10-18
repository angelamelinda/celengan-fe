export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
}

export const setLocalStorage = (key: string, value: string) => {
    return localStorage.setItem(key, value);
}

export const removeLocalStorage = (key: string) => {
    return localStorage.removeItem(key)
}

export const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
};

export const getDate = (isoDate?: string) => {
    const date = (isoDate && new Date(isoDate)) || new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const startDate = new Date(year, month, 1)
    startDate.setHours(0, 0, 0);
    startDate.setMilliseconds(0);

    const endDate = new Date(year, month, getDaysInMonth(month, year));
    endDate.setHours(23, 59, 59);

    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
}

export const convertMoneyToIDR = (amount: number) => {
    return `${Math.abs(amount).toLocaleString(
        "id-ID"
    )}`;
};
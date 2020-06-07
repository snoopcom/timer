export const secondsDevider = (period) => Math.floor((period / 1000) % 60);
export const minutesDevider = (period) => Math.floor(((period / 1000) % (60 * 60)) / 60);
export const millisecondsDevider = (period) => period.toString().slice(-2);


/*
export const calculateDisplayMinutes = (total, period) => Math.floor((total - period) / 60);
export const calculateDisplaySeconds = (total, period) => (total - period) % 60;
export const calculateProgress = (total, period) => Math.floor((100 * period) / total);
*/
export const getNumberInKs = (num: number): string | number => num > 999 ? `${roundTo(num/1000,2)}k` : num; 

export const  roundTo = (num: number, places: number): number => {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
  }
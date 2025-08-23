// در یک فایل، مثلا utils.ts
export {}; // TODO: Marks this file as a module — enables scoped declarations and import/export usage

// TODO: Extend NodeJS.Global interface to include custom properties (e.g. config, logger, cache)
declare global {
  namespace NodeJS {
    interface Global {
      enToFa: (str: string) => string;
      faToEn: (str: string) => string;
      formatPrice: (amount: number | string) => string;
    }
  }
}

// TODO: Assign functions to globalThis
globalThis.enToFa = (str: string): string => {
  str = String(str);
  const fa: string[] = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const en: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < 10; i++) {
    str = str.replaceAll(en[i], fa[i]);
  }
  return str;
};

globalThis.faToEn = (str: string): string => {
  str = String(str);
  const fa: string[] = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const en: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (let i = 0; i < 10; i++) {
    str = str.replaceAll(fa[i], en[i]);
  }
  return str;
};

globalThis.formatPrice = (amount: number | string): string => {
  //TODO: Ensure amount is in English numerals
  amount = globalThis.faToEn(amount);
  const decimalCount: number = 2;
  const thousands: string = ",";
  const decimal: string = ".";

  const num = Number(amount);
  const negativeSign = num < 0 ? "-" : "";

  const absAmount = Math.abs(num).toFixed(decimalCount);
  const integerPart = parseInt(absAmount).toString();
  const j = integerPart.length > 3 ? integerPart.length % 3 : 0;

  const formattedNumber =
    negativeSign +
    (j ? integerPart.substring(0, j) + thousands : "") +
    integerPart.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
    (decimalCount
      ? decimal +
        (Number(absAmount) - parseInt(integerPart))
          .toFixed(decimalCount)
          .slice(2)
      : "");

  return globalThis.enToFa(formattedNumber);
};

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const ENGLISH_DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const enToFa = (str: string): string => {
  str = String(str);
  for (let i = 0; i < 10; i++) {
    str = str.replaceAll(
      ENGLISH_DIGITS[i] as string,
      PERSIAN_DIGITS[i] as string,
    );
  }
  return str;
};

export const faToEn = (str: string): string => {
  str = String(str);
  for (let i = 0; i < 10; i++) {
    str = str.replaceAll(
      PERSIAN_DIGITS[i] as string,
      ENGLISH_DIGITS[i] as string,
    );
  }
  return str;
};

export const formatPrice = (amount: number | string): string => {
  amount = faToEn(String(amount));
  const decimalCount: number = 2;
  const thousands: string = ",";
  const decimal: string = ".";

  const num = Number(amount);
  const negativeSign = num < 0 ? "-" : "";

  const absAmount = Math.abs(num).toFixed(decimalCount);
  const integerPart = parseInt(absAmount).toString();
  const j = integerPart.length > 3 ? integerPart.length % 3 : 0;

  const formattedNumber: string =
    negativeSign +
    (j ? integerPart.substring(0, j) + thousands : "") +
    integerPart.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
    (decimalCount
      ? decimal +
        (Number(absAmount) - parseInt(integerPart))
          .toFixed(decimalCount)
          .slice(2)
      : "");

  return enToFa(formattedNumber);
};

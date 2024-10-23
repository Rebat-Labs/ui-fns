/**
 * custom delay function
 * @param ms time
 * @returns {Promise<void>}
 */
export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function createInitials(name: string, length = 2): string {
  const parts = name.split(' ').filter(part => part.length > 0);
  const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials.slice(0, length);
}

export function isThisAWord(value?: string) {
  if (!value) return;
  return value.length > 1 ? value : undefined;
}

/**
 * converts date to unix timestamp
  * @param {Date} date value
 * @return {number} timestamp
 */
export function convertDateToUnix(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

/**
 * get unix timestamp of now
 * @return {number} timestamp
 */
export function unixTimeStampNow(): number {
  const now = new Date();
  return Math.floor(now.getTime() / 1000);
}

/**
 * converts unix timestamp to date
  * @param {number} timestamp
 * @return {Date} date item
 */
export function convertUnixToDate(timestamp: number): Date {
  const date = new Date(timestamp * 1000);
  return date;
}


/**
 * Random string generator helper
 * @param {number} length
 * @return {string} value
 */
export function generateRandomAlphaNumeric(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const removeTrailingSlash = function (url: string | undefined) {
  if (url === undefined || url === null) return '';
  return url.replace(/\/$/, "");
}


export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
* Generates formatted currency string
* @param {number} amount to be formatted
* @param {number} currency value currency
* @return {string} value
*/
export function formatCurrency(
  amount: number, currency = 'NGN'): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amount)
}

export function formatCash(value: number) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}


export function formatNumber(amount: number): string {
  return Intl.NumberFormat('en-US').format(amount)
}

export function getRandomUnixTimestamp(startYear: number, endYear: number): number {
  const startDate = new Date(startYear, 0, 1).getTime(); // January 1st of the start year
  const endDate = new Date(endYear, 11, 31, 23, 59, 59).getTime(); // December 31st of the end year
  return Math.floor(Math.random() * (endDate - startDate + 1) + startDate) / 1000;
}

export function unixTimestampToMaxAge(expirationUnixTimestamp: number) {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000);
  const maxAge = expirationUnixTimestamp - currentUnixTimestamp;
  return maxAge > 0 ? maxAge : 0;
}

export function parseInterface(data: any) {
  return JSON.parse(JSON.stringify(data));
}


export function expiresAt(duration: number, format: 'm' | 'h' | 's' = 'm'): number {
  const now = new Date();
  if (format === 'm') {
    now.setMinutes(new Date().getMinutes() + duration);
  } else if (format === 'h') {
    now.setHours(new Date().getHours() + duration);
  } else {
    now.setSeconds(new Date().getSeconds() + duration);
  }
  return convertDateToUnix(now);
}

export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

export function isEven(num: number): boolean {
  return num % 2 === 0;
}

export function getValueByQuery<T>(obj: T, query: string): any | undefined {
  return query.split('.').reduce((acc: any, key: string) => {
    return acc ? acc[key] : undefined;
  }, obj);
}

export function isValidURL(url: string): boolean {
  // Extract the scheme part of the URL if it exists (e.g., 'myscheme://')
  const schemeMatch = url.match(/^([a-zA-Z][a-zA-Z\d+\-.]*):\/\//);
  const scheme = schemeMatch ? schemeMatch[1] : null;

  // Define the regular expression for a valid URL (http, https, or custom schemes)
  const urlPattern = new RegExp(
    `^(${scheme ? scheme : 'https?'})` + // Validate HTTP/HTTPS or the detected scheme
    ':\\/\\/' + // ://
    '([\\w-]+(:[\\w-]+)?@)?' + // Optional username:password@
    '((\\d{1,3}\\.){3}\\d{1,3}|([\\w-]+\\.)+[a-zA-Z]{2,})' + // IP address or domain name
    '(\\:\\d+)?' + // Optional port
    '(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?' + // Path
    '(\\?[;&a-zA-Z0-9%_\\+.~#?&=]*)?' + // Query string
    '(\\#[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$' // Fragment
  );

  return urlPattern.test(url);
}

export function recordToArray(record: Record<string, string>): string[] {
  return Object.values(record);
}

export const formatDate = (date: Date): string => {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',  // "Sep"
    day: 'numeric',  // "14"
    year: 'numeric', // "2024"
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',   // "01"
    minute: '2-digit', // "27"
    hour12: false,     // Optional: Change this to true if you want 12-hour format
  });

  return `${formattedDate} at ${formattedTime}`;
};

export function obscureString(input: string): string {
  return input.replace(/./g, '•');
}

export function calculatePercentage(amount: number, percentage: number) {
  return (amount * percentage) / 100;
}

export function calculateDaysBetweenTimestamps(timestamp1: number, timestamp2: number): number {
  const secondsInADay = 60 * 60 * 24;
  const differenceInSeconds = Math.abs(timestamp2 - timestamp1); // Get the absolute difference
  const daysDifference = differenceInSeconds / secondsInADay;
  return Math.floor(daysDifference); // Round down to get full days
}

/**
 * Gets last day of month
  * @param {number} year
  * @param {number} month
 * @return {Date} date item
 */
export function getLastDayOfMonth(year: number,
  month: number): Date {
  return new Date(year, month + 1, 0);
}

/**
 * Gets month name
  * @param {number} month
 * @return {string} date item
 */
export function getMonthName(month: number): string {
  const date = new Date(2009, month, 10);
  const val = date.toLocaleString('default', { month: 'long' });

  return val;
}

/**
 * Random integer generator helper
 * @param {number} max
 * @return {number} num
 */
export function getRandomInteger(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Date Helper
 * @param {string} date1
 * @param {string} date2
 * @return {number} value
 */
export function getDifferenceInHours(date1: Date, date2: Date): number {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return diffInMs / (1000 * 60 * 60);
}

/**
 * Date Helper
 * @param {string} date1
 * @param {string} date2
 * @return {number} value
 */
export function getDifferenceInMinutes(date1: Date, date2: Date): number {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return diffInMs / (1000 * 60);
}

/**
 * Date Helper
 * @param {string} date1
 * @param {string} date2
 * @return {number} value
 */
export function getDifferenceInSeconds(date1: Date, date2: Date): number {
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  return diffInMs / 1000;
}


/**
 * rounding function
 * @param n the digit
 * @param place number of places to round to
 * @returns {number}
 */
export function roundTo(n: number, place: number): number {
  return Number(n.toFixed(place));
}

export function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
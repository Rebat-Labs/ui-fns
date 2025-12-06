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
 * Check if string is equalToIgnoreCase
  * @param {string} comparingAgainst
 * @param {string} comparingTo
 * @return {boolean} bool item
 */
export function equalToIgnoreCase(comparingAgainst: string,
  comparingTo: string): boolean {
  if (comparingAgainst.toUpperCase() ===
    comparingTo.toUpperCase()) {
    return true;
  } else if (comparingAgainst.toLowerCase() ===
    comparingTo.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if string is equalToIgnoreCase
  * @param {string} comparingAgainst
 * @param {string} comparingTo
 * @return {boolean} bool item
 */
export function compareEqualsTo(comparingAgainst: string,
  comparingTo: string): boolean {
  return comparingAgainst.localeCompare(comparingTo,
    undefined, { sensitivity: "base" }) === 1;
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
 * Generates a UUID v4 string.
 * Compatible with environments without crypto.randomUUID().
 * 
 * @returns {string} A unique UUID string.
 */
export function generateDocumentUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0; // Generate random 0-15
    const value = char === 'x' ? random : (random & 0x3) | 0x8; // Set bits for 'y'
    return value.toString(16); // Convert to hexadecimal
  });
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


export const removeAllIdentifiers = function (url: string | undefined) {
  if (url === undefined || url === null || !url.includes("_")) return '';
  return url.split("_")[1];
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


export function dateFormatter(
  date: Date | string | number,
  options: {
    showDate?: boolean;
    showTime?: boolean;
    basic?: boolean;
    showDayOfWeek?: boolean;
    format?: 'full' | 'dayTime'; // 'dayTime' = "Wednesday at 09:00 am"
  } = {
      showDate: true,
      showTime: true,
      basic: false,
      showDayOfWeek: false
    }
): string {
  const parseDate = (input: Date | string | number): Date => {
    if (input instanceof Date) {
      return input;
    } else if (typeof input === "string" || typeof input === "number") {
      const parsed = new Date(input);
      if (isNaN(parsed.getTime())) {
        throw new Error("Invalid date format");
      }
      return parsed;
    }
    throw new Error("Unsupported date type");
  };

  const parsedDate = parseDate(date);

  const getDayOfMonthSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const dayOfWeek = daysOfWeek[parsedDate.getDay()];
  const day = parsedDate.getDate();
  const daySuffix = getDayOfMonthSuffix(day);
  const month = months[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const period = hours >= 12 ? "pm" : "am";
  const formattedTime = `${(hours % 12 || 12).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;

  // Handle special format first
  if (options.format === 'dayTime') {
    return `${dayOfWeek} at ${formattedTime}`;
  }

  const datePart = options.showDayOfWeek
    ? `${dayOfWeek}, ${day}${daySuffix} ${month} ${year}`
    : `${day}${daySuffix} ${month} ${year}`;
  const basicPart = `${month} ${year}`;

  if (options.basic) {
    return basicPart;
  } else if (options.showDate && options.showTime) {
    return `${datePart}, at ${formattedTime}`;
  } else if (options.showDate) {
    return datePart;
  } else if (options.showTime) {
    return formattedTime;
  } else {
    return "";
  }
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


export function getInitialsFromEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Remove everything after @ to ignore the domain part
  const localPart = email.split('@')[0];

  // Split by common separators (., _, -)
  const parts = localPart.split(/[._-]/);

  // Filter out empty parts and take first 2 segments
  const validParts = parts.filter(part => part.length > 0).slice(0, 2);

  if (validParts.length === 0) {
    // If no valid parts, try to use first two letters of local part
    return localPart.slice(0, 2).toUpperCase();
  }

  if (validParts.length === 1) {
    // If only one part, use first two letters
    return validParts[0].slice(0, 2).toUpperCase();
  }

  // If multiple parts, use first letter of first two parts
  return validParts
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

export function normalizeDate(input: number | Date | string | null | undefined): Date {
  if (!input) return new Date(0); // fail-safe
  if (typeof input === 'number') return new Date(input * 1000);
  if (typeof input === 'string') return new Date(input);
  return input;
}

export function normalizeTimestamp(timestamp: number | Date | string | null | undefined): number | null {
  if (timestamp === null || timestamp === undefined) {
    return null;
  }

  if (typeof timestamp === 'number') {
    // Already a Unix timestamp
    return timestamp;
  }

  if (timestamp instanceof Date) {
    return Math.floor(timestamp.getTime() / 1000);
  }

  if (typeof timestamp === 'string') {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return null; // Invalid date string
    }
    return Math.floor(date.getTime() / 1000);
  }

  return null;
}

export function formatNairaCurrency(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}


export function addQueryParams(
  originalUrl: string,
  newParams: Record<string, string | number | boolean>
): string {
  try {
    // Create URL object from the original URL
    const url = new URL(originalUrl);

    // Get the existing search params
    const searchParams = url.searchParams;

    // Add/update the new parameters
    Object.entries(newParams).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

    // Return the complete URL with updated query parameters
    return url.toString();
  } catch (error) {
    throw new Error(`Invalid URL provided: ${originalUrl}`);
  }
}

export function appendQueryParams(
  originalUrl: string,
  newParams: Record<string, string | string[] | number | boolean>
): string {
  try {
    const url = new URL(originalUrl);
    const searchParams = url.searchParams;

    Object.entries(newParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // For arrays, append multiple values for the same key
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        // For single values, append (doesn't overwrite existing)
        searchParams.append(key, String(value));
      }
    });

    return url.toString();
  } catch (error) {
    throw new Error(`Invalid URL provided: ${originalUrl}`);
  }
}

export function fixUrl(url: string) {
  if (url.startsWith("https://") || url.startsWith("http://")) return;
  return `https://${url}`;
}

/**
 * Fast function to find a multiselect object by either label or value (case-insensitive) in nested structure
 * @param array - Array of OptionSchema objects
 * @param searchTerm - The term to search for (checks both label and value)
 * @returns The matching option object or undefined if not found
 */
export function findMultiselectByLabelOrValue(
  array: {
    label: string;
    options: {
      label: string;
      group: string;
      value: string;
    }[];
  }[],
  searchTerm: string
): { label: string; group: string; value: string } | undefined {
  const lowerSearchTerm = searchTerm.toLowerCase();

  for (let i = 0; i < array.length; i++) {
    const optionGroup = array[i];
    for (let j = 0; j < optionGroup.options.length; j++) {
      const option = optionGroup.options[j];
      if (option.label.toLowerCase() === lowerSearchTerm || option.value.toLowerCase() === lowerSearchTerm) {
        return option;
      }
    }
  }

  return undefined;
}


export function createSlug(name: string): string {
  return name
    .toLowerCase()                    // Convert to lowercase
    .trim()                          // Remove leading/trailing whitespace
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')     // Remove non-alphanumeric characters except hyphens
    .replace(/-+/g, '-')            // Replace multiple consecutive hyphens with single hyphen
    .replace(/^-|-$/g, '');         // Remove leading/trailing hyphens
}

export function unslug(slug: string, capitalize: boolean = true): string {
  let result = slug
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (capitalize) {
    result = result.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
  }

  return result;
}


export function obscureEmail(email: string): string {
  // Basic email validation
  if (!email.includes('@') || email.split('@').length !== 2) {
    throw new Error('Invalid email format');
  }

  const [username, domain] = email.split('@');

  // Helper function to obscure a string part
  function obscurePart(part: string): string {
    if (part.length <= 2) {
      // If part is too short, show first character + asterisks
      return part[0] + '*'.repeat(part.length - 1);
    }

    // Show first and last character, fill middle with asterisks
    const firstChar = part[0];
    const lastChar = part[part.length - 1];
    const middleLength = part.length - 2;

    return firstChar + '*'.repeat(middleLength) + lastChar;
  }

  // Handle domain with potential subdomain and TLD
  const domainParts = domain.split('.');
  const domainName = domainParts[0]; // Main domain part
  const tld = domainParts.slice(1).join('.'); // Everything after first dot

  const obscuredUsername = obscurePart(username);
  const obscuredDomain = obscurePart(domainName);

  return `${obscuredUsername}@${obscuredDomain}.${tld}`;
}

export function extractFirstNameFromEmail(email: string): string {
  if (!email) {
    throw new Error('Email is required');
  }
  const firstName = email.split('@')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

/**
 * checks if we past that date
  * @param {Date} date
 * @return {boolean} date item
 */
export function isDateBefore(date: Date): boolean {
  return new Date(date.toDateString()) <
    new Date(new Date().toDateString());
}

type ParamValue = string | string[] | number | boolean;
type ParamsRecord = Record<string, ParamValue>;

export function buildSearchParams(host: string, params: ParamsRecord): string {
  // Filter out undefined/null values
  const entries = Object.entries(params).filter(
    ([_, value]) => value !== undefined && value !== null
  );

  // If no valid params, return just the host
  if (entries.length === 0) {
    return host;
  }

  // Build URLSearchParams
  const searchParams = new URLSearchParams();

  entries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays by adding multiple entries with the same key
      value.forEach(v => searchParams.append(key, String(v)));
    } else {
      // Convert boolean/number to string
      searchParams.append(key, String(value));
    }
  });

  return `${host}?${searchParams.toString()}`;
}
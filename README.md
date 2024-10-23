

# UI Functions Library

This library provides a collection of utility functions designed to assist with various common tasks in JavaScript projects, particularly those related to frontend development. It is structured to be a shared resource for projects using a monorepo setup.

## Installation

To install this package, use npm:

```bash
npm install @rebatlabs/ui-funs
```

## Usage

Import the functions you need from the library:

```javascript
import { obscureNIN, snakeCase, camelCase, capitalizeWords, delay, createInitials, convertDateToUnix, unixTimeStampNow, formatCurrency } from '@rebatlabs/ui-funs';
```

## Functions

### String Utilities

- **obscureNIN(input: string): string**
  - Obscures a National Identification Number (NIN) by masking the middle characters.
  
- **snakeCase(value: string): string**
  - Converts a string to snake_case.

- **camelCase(value: string): string**
  - Converts a string to camelCase.

- **capitalizeWords(value: string): string**
  - Capitalizes the first letter of each word in a string.

- **headlineOnly(value: string): string**
  - Capitalizes the first letter of each significant word in a headline.

### General Utilities

- **delay(ms: number): Promise<void>**
  - Returns a promise that resolves after a specified delay in milliseconds.

- **createInitials(name: string, length = 2): string**
  - Generates initials from a given name.

- **isThisAWord(value?: string): string | undefined**
  - Checks if a given string is a word (more than one character).

- **convertDateToUnix(date: Date): number**
  - Converts a Date object to a Unix timestamp.

- **unixTimeStampNow(): number**
  - Returns the current Unix timestamp.

- **generateRandomAlphaNumeric(length: number): string**
  - Generates a random alphanumeric string of a specified length.

- **removeTrailingSlash(url: string | undefined): string**
  - Removes the trailing slash from a URL.

- **getRandomInt(max: number): number**
  - Returns a random integer between 0 and the specified maximum.

- **formatCurrency(amount: number, currency = 'NGN'): string**
  - Formats a number as a currency string.

- **formatCash(value: number): string**
  - Formats a number in a compact cash notation.

- **formatNumber(amount: number): string**
  - Formats a number with commas as thousands separators.

- **getRandomUnixTimestamp(startYear: number, endYear: number): number**
  - Generates a random Unix timestamp between two years.

- **unixTimestampToMaxAge(expirationUnixTimestamp: number): number**
  - Calculates the max-age in seconds from a Unix timestamp.

- **parseInterface(data: any): any**
  - Parses and returns a deep copy of the given data.

- **expiresAt(duration: number, format: 'm' | 'h' | 's' = 'm'): number**
  - Returns a Unix timestamp for a future expiration time.

- **isOdd(num: number): boolean**
  - Checks if a number is odd.

- **isEven(num: number): boolean**
  - Checks if a number is even.

- **getValueByQuery<T>(obj: T, query: string): any | undefined**
  - Retrieves a value from an object using a dot-separated query string.

- **isValidURL(url: string): boolean**
  - Validates if a string is a properly formatted URL.

- **recordToArray(record: Record<string, string>): string[]**
  - Converts a record to an array of its values.

- **formatDate(date: Date): string**
  - Formats a Date object into a readable string.

- **obscureString(input: string): string**
  - Obscures a string by replacing each character with a bullet point.

- **calculatePercentage(amount: number, percentage: number): number**
  - Calculates a percentage of a given amount.

- **calculateDaysBetweenTimestamps(timestamp1: number, timestamp2: number): number**
  - Calculates the number of days between two Unix timestamps.

- **getLastDayOfMonth(year: number, month: number): Date**
  - Returns the last day of a given month and year.

- **getMonthName(month: number): string**
  - Returns the name of a month given its number.

- **getRandomInteger(max: number): number**
  - Returns a random integer between 0 and the specified maximum.

- **getDifferenceInHours(date1: Date, date2: Date): number**
  - Calculates the difference in hours between two dates.

- **getDifferenceInMinutes(date1: Date, date2: Date): number**
  - Calculates the difference in minutes between two dates.

- **getDifferenceInSeconds(date1: Date, date2: Date): number**
  - Calculates the difference in seconds between two dates.

- **roundTo(n: number, place: number): number**
  - Rounds a number to a specified number of decimal places.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License.

---

This README provides a comprehensive overview of the functions available in your library, making it easier for you and your team to understand and utilize the library effectively. Adjust the descriptions and examples as needed to better fit your team's specific use cases.
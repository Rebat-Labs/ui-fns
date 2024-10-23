const stringify = require('string-it-on');

export function obscureNIN(input: string): string {
  // If the string is too short, return it as is
  if (input.length < 11) {
    return input;
  }

  // Get the first 4 characters
  const start = input.slice(0, 2);

  // Get the last 2 characters
  const end = input.slice(-3);

  // Obscure the middle part
  const obscuredPart = '*'.repeat(input.length - 5);

  // Combine the parts
  return `${start}${obscuredPart}${end}`;
}

/**
 * i.e hello world to hello_world
 * @param value string value
 */
export function snakeCase(value: string): string {
  return stringify.snakeCase(value);
}

/**
 * i.e hello world to helloWorld
 * @param value string value
 */
export function camelCase(value: string): string {
  return stringify.camelCase(value);
}

/**
 * i.e hello world to Hello World
 * @param value string value
 */
export function capitalizeWords(value: string): string {
  return stringify.capitalizeWords(value);
}


/**
 * i.e the hello in for the world to The Hello in for the World
 * @param value string value
 */
export function headlineOnly(value: string): string {
  return stringify.capitalizeHeadline(value);
}


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

## Error Handling with PlatformError

The library provides a robust error handling system through the `PlatformError` class, which extends the native JavaScript `Error` class with additional functionality for structured error responses.

### Importing PlatformError

```typescript
import { PlatformError, ErrorResponse, ErrorType, CallerErrorType } from '@rebatlabs/ui-funs';
```

### Creating PlatformError Instances

#### Method 1: Simple String Constructor
```typescript
// Create with just a message string
const error = new PlatformError("User not found", 404, 'param_error');

// Access properties
console.log(error.getMessage()); // "User not found"
console.log(error.getCode()); // 404
console.log(error.getErrorResponse()?.type); // "param_error"
```

#### Method 2: Full ErrorResponse Object
```typescript
const errorResponse: ErrorResponse = {
  reason: "Invalid authentication token",
  type: "authorization_error",
  caller_error: "Authorization error",
  code: 401,
  label: "AUTH_TOKEN_INVALID",
  solution: "Please provide a valid authentication token",
  body: {
    token: "expired_token_123",
    expiresAt: "2024-01-01T00:00:00Z"
  }
};

const authError = new PlatformError(errorResponse);
```

### Error Types

The library supports several predefined error types:

```typescript
type ErrorType = 
  | 'param_error'           // Parameter validation errors
  | 'sever_error'           // Server-side errors
  | 'external_service_error' // Third-party service errors
  | 'session_cancel'        // Session cancellation
  | 'unknown_error'         // Unhandled errors
  | 'authorization_error'   // Authentication/authorization errors
  | 'session_expiry'        // Session expiration
  | 'invalid_request'       // Invalid request format
  | 'configuration_error';  // Configuration issues
```

### Caller Error Types

```typescript
type CallerErrorType = 
  | 'Authorization error'           // Authentication issues
  | 'Unknown caller'                // Unrecognized client
  | 'Misplaced request'             // Request sent to wrong endpoint
  | 'Session required'              // Session needed but not provided
  | 'Developer error'               // Development-time errors
  | 'Third party requirement error' // External service requirements
  | 'Configurations error';         // Configuration problems
```

### Practical Usage Examples

#### Example 1: API Validation Error
```typescript
function validateUserInput(userData: any) {
  if (!userData.email) {
    throw new PlatformError({
      reason: "Email is required",
      type: "param_error",
      caller_error: "Developer error",
      code: 400,
      label: "EMAIL_REQUIRED",
      solution: "Please provide a valid email address"
    });
  }
  
  if (!userData.email.includes('@')) {
    throw new PlatformError({
      reason: "Invalid email format",
      type: "param_error", 
      caller_error: "Developer error",
      code: 400,
      label: "EMAIL_INVALID",
      solution: "Please provide a valid email format (e.g., user@example.com)"
    });
  }
}
```

#### Example 2: Authentication Error
```typescript
function authenticateUser(token: string) {
  if (!token) {
    throw new PlatformError({
      reason: "Authentication token is required",
      type: "authorization_error",
      caller_error: "Authorization error",
      code: 401,
      label: "TOKEN_MISSING",
      solution: "Please include your authentication token in the request headers"
    });
  }
  
  if (isTokenExpired(token)) {
    throw new PlatformError({
      reason: "Authentication token has expired",
      type: "session_expiry",
      caller_error: "Session required",
      code: 401,
      label: "TOKEN_EXPIRED",
      solution: "Please refresh your authentication token"
    });
  }
}
```

#### Example 3: External Service Error
```typescript
async function callExternalAPI() {
  try {
    const response = await fetch('https://api.external.com/data');
    if (!response.ok) {
      throw new PlatformError({
        reason: `External API returned ${response.status}: ${response.statusText}`,
        type: "external_service_error",
        caller_error: "Third party requirement error",
        code: response.status,
        label: "EXTERNAL_API_ERROR",
        body: {
          status: response.status,
          statusText: response.statusText,
          url: response.url
        }
      });
    }
    return await response.json();
  } catch (error) {
    if (error instanceof PlatformError) {
      throw error;
    }
    throw new PlatformError({
      reason: "Failed to communicate with external service",
      type: "external_service_error",
      caller_error: "Third party requirement error",
      code: 503,
      label: "EXTERNAL_SERVICE_UNAVAILABLE"
    });
  }
}
```

#### Example 4: Error Handling and Logging
```typescript
function handleUserRequest(userId: string) {
  try {
    if (!userId) {
      throw new PlatformError("User ID is required", 400, 'param_error');
    }
    
    // Process user request...
    return { success: true, userId };
    
  } catch (error) {
    // Check if it's already a PlatformError
    if (PlatformError.isPlatformError(error)) {
      // Log the error with stack trace
      const loggedError = error.logError();
      console.error('Platform Error:', loggedError);
      
      // Return structured error response
      return {
        success: false,
        error: error.getError(),
        httpResponse: error.getHttpResponse()
      };
    }
    
    // Convert unknown errors to PlatformError
    const platformError = PlatformError.handleError(error);
    return {
      success: false,
      error: platformError.getError()
    };
  }
}
```

#### Example 5: Express.js Middleware Integration
```typescript
import express from 'express';
import { PlatformError } from '@rebatlabs/ui-funs';

const app = express();

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (PlatformError.isPlatformError(error)) {
    const errorResponse = error.getErrorResponse();
    return res.status(error.getCode()).json({
      success: false,
      error: errorResponse,
      timestamp: new Date().toISOString()
    });
  }
  
  // Handle unknown errors
  const platformError = PlatformError.handleError(error);
  return res.status(500).json({
    success: false,
    error: platformError.getError(),
    timestamp: new Date().toISOString()
  });
});

// Example route with error handling
app.get('/users/:id', (req, res, next) => {
  try {
    const userId = req.params.id;
    
    if (!userId || userId === 'undefined') {
      throw new PlatformError({
        reason: "Invalid user ID provided",
        type: "param_error",
        caller_error: "Developer error",
        code: 400,
        label: "INVALID_USER_ID"
      });
    }
    
    // Process request...
    res.json({ success: true, userId });
    
  } catch (error) {
    next(error); // Pass to error handling middleware
  }
});
```

### Key Methods

- **`getMessage()`**: Returns the error message
- **`getCode()`**: Returns the HTTP status code
- **`getErrorResponse()`**: Returns the full error response object
- **`getHttpResponse()`**: Returns the body content for HTTP responses
- **`getError()`**: Returns a parsed copy of the error response
- **`logError()`**: Adds stack trace and returns the error response
- **`PlatformError.handleError(err)`**: Converts unknown errors to PlatformError
- **`PlatformError.isPlatformError(err)`**: Checks if an error is a PlatformError instance

### Best Practices

1. **Always provide meaningful error messages** with clear reasons
2. **Use appropriate error types** to categorize issues
3. **Include solution hints** to help developers/users resolve issues
4. **Set proper HTTP status codes** for API responses
5. **Use labels** for consistent error identification across your application
6. **Log errors** with stack traces for debugging
7. **Handle unknown errors** using the static `handleError` method

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License.

---

This README provides a comprehensive overview of the functions available in your library, making it easier for you and your team to understand and utilize the library effectively. Adjust the descriptions and examples as needed to better fit your team's specific use cases.
import { parseInterface } from ".";

export type ErrorType = 'param_error' | 'sever_error' |
  'external_service_error' | 'session_cancel' | 'unknown_error' |
  'authorization_error' | 'session_expiry' | 'invalid_request' | 'configuration_error';

export type CallerErrorType = 'Authorization error' | 'Unknown caller' | 'Misplaced request' | 'Session required' | 'Developer error' | 'Third party requirement error' | 'Configurations error';

export interface ErrorResponse {
  reason: string;
  type?: ErrorType;
  caller_error: CallerErrorType;
  label?: string;
  code?: number;
  body?: Record<string, unknown>,
  solution?: string;
  trace?: string;
}

/**
 * PlatformError class
*/
export class PlatformError extends Error {
  code: number;
  private errorResponse: ErrorResponse | undefined;

  /**
   * constructor
   * @param {ErrorResponse} param 
   * @param {number} code 
   */
  constructor(param: string | ErrorResponse, code?: number, type?: ErrorType) {
    if (typeof param === 'string') {
      super(param);
      this.code = code as number;
      this.errorResponse = {
        reason: param,
        caller_error: 'Misplaced request',
        type: type ?? 'unknown_error',
      };
      this.code = code ?? 400;
    } else {
      super(param.reason);
      this.errorResponse = param;
      this.code = param.code ?? (code ?? 400) ;
    }

    this.name = 'PlatformError <ui-fns>'
    // Set the prototype explicitly (required for extending built-ins in TypeScript)
    Object.setPrototypeOf(this, PlatformError.prototype);
  }

  /**
   * get message
   * @return {string} returns doc map .
   */
  getMessage(): string {
    return this.message;
  }
  /**
 * get error code
 * @return {string} returns code .
 */
  getCode(): number {
    return this.code;
  }
  /**
   * get error response
   * @return {string} returns doc map .
   */
  getErrorResponse(): ErrorResponse | undefined {
    return this.errorResponse;
  }

  /**
   * get error response
   * @return {string} returns doc map .
   */
  getHttpResponse(): Record<string, unknown> | undefined {
    return this.errorResponse?.body;
  }

  /**
* get error
* @return {Record<string, unknown>} returns doc map .
*/
  getError(): Record<string, unknown> {
    return parseInterface(this.errorResponse);
  }

  /**
  * get error log
  * @return {string} returns doc map .
  */
  logError(): ErrorResponse | undefined {
    if (this.errorResponse) {
      var err = new Error();
      this.errorResponse.trace = err.stack;
    }
    return this.errorResponse;
  }


  /**
   * Handles unknown error
   * @param {Object} err the object
   * @returns {SeverError} returns this class
   */
  public static handleError(err: unknown): PlatformError {

    if (this.isPlatformError(err)) return err as PlatformError;

    return new PlatformError({
      reason: `${err}`,
      caller_error: 'Developer error',
      type: 'unknown_error',
    });
  }
  /**
   * Check if error type class
   * @param {object} error the object
   * @returns {boolean} returns true or false
   */
  public static isPlatformError(error: object | unknown): boolean {
    return error instanceof PlatformError;
  }
}

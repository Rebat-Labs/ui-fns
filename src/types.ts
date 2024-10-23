export type HTTP_METHOD = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export type Request = {
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>,
}

export const DEFAULT_ERROR: IResponseTemplate = {
  status: 'failed',
  reason: 'Connection is improper and thus has been interrupted',
  type: 'unknown_error',
};

export type TCountry = {
  name: string;
  dial: string;
  code: string;
}

export type TAppCategory = {
  name: string;
  key: string;
}

/**
 * error response
 */
export type errortype = 'api_error' | 'param_error' | 'db_error' |
  'external_service_error' | 'session_cancel' | 'unknown_error' |
  'authorization_error' | 'session_expiry' | 'invalid_request';

export type status = 'successful' | 'handled' |
  'mismatch' | 'token-mismatch' | 'unauthorized' |
  'expiration' | 'failed' | 'extreme';

export interface IResponseTemplate {
  status: status;
  reason: string;
  type: errortype;
  /**
   * You can overlook this attribute
   */
  label?: string;
  /**
   * Present in a successful response
   */
  data?: Record<string, unknown>;
  /**
   * Present in an errored response
   */
  body?: Record<string, unknown>;
  /**
   * link to reference learning kit
   */
  helper_url?: string;
};
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

export type TCountryJson = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Array<{
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }>;
  translations: Record<string, string>;
  emoji: string;
  emojiU: string;
}

export type TStateJson = {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string | null;
  latitude: string;
  longitude: string;
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
import axios from "axios";
import { errortype, status, HTTP_METHOD, IResponseTemplate, Request, DEFAULT_ERROR } from "./types";

// Check if we're in an Edge Runtime environment
const isEdgeRuntime = typeof globalThis !== 'undefined' && 
  (globalThis as any).EdgeRuntime !== undefined;

// Create an Edge Runtime compatible axios instance
const axiosInstance = axios.create({
  // Use browser-compatible defaults
  timeout: 30000,
  // Ensure we're using browser-compatible features
  withCredentials: false,
});

/**
 * Use this on sever side only
 * Sends an HTTP request using Axios and returns the response data.
 *
 * @param url - The URL to which the request is sent.
 * @param method - The HTTP method to use for the request (e.g., 'GET', 'POST').
 * @param param - An object containing request parameters such as headers and body.
 * @returns A promise that resolves to the response data or an error response template.
 */
export async function requester(url: string, method: HTTP_METHOD, param: Request): Promise<IResponseTemplate> {
  // Use fetch for Edge Runtime, axios for Node.js
  if (isEdgeRuntime) {
    return await edgeRuntimeRequester(url, method, param);
  }
  
  try {
    // Prepare Axios request options, including headers and body if applicable
    const axiosOptions = {
      headers: param.headers
        ? JSON.parse(JSON.stringify(param.headers)) // Clone headers to avoid mutation
        : { 'Accept': 'application/json' }, // Default header if none provided
      ...((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }), // Include body for specific methods
    };

    // Send the request using Axios and await the response
    const response = await axiosInstance.request<IResponseTemplate>({
      url,
      method,
      ...axiosOptions,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle Axios errors with a response
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Requester axios error --- ${JSON.stringify(error.response.data)}`);
      const errorResponse: { status: string, type: string, reason: string, label: string } = error.response.data;
      return {
        status: errorResponse.status as status,
        reason: errorResponse.reason,
        type: errorResponse.type as errortype,
      };
    } else {
      // Return a default error if no response is available
      return DEFAULT_ERROR;
    }
  }
}

/**
 * Edge Runtime compatible requester using native fetch API
 */
async function edgeRuntimeRequester(url: string, method: HTTP_METHOD, param: Request): Promise<IResponseTemplate> {
  try {
    const headers = param.headers
      ? JSON.parse(JSON.stringify(param.headers))
      : { 'Accept': 'application/json' };

    const fetchOptions: RequestInit = {
      method,
      headers,
      ...((method === 'POST' || method === 'PUT' || method === 'PATCH') && { body: JSON.stringify(param.body) }),
    };

    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: response.status.toString() as status,
        reason: errorData.reason || `HTTP ${response.status}`,
        type: 'error' as errortype,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Edge Runtime requester error:', error);
    return DEFAULT_ERROR;
  }
}

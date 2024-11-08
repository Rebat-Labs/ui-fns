import axios from "axios";
import { errortype, status, HTTP_METHOD, IResponseTemplate, Request, DEFAULT_ERROR } from "./types";

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
  try {
    // Prepare Axios request options, including headers and body if applicable
    const axiosOptions = {
      headers: param.headers
        ? JSON.parse(JSON.stringify(param.headers)) // Clone headers to avoid mutation
        : { 'Accept': 'application/json' }, // Default header if none provided
      ...((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }), // Include body for specific methods
    };

    // Send the request using Axios and await the response
    const response = await axios.request<IResponseTemplate>({
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

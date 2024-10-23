import axios from "axios";
import { errortype, status, HTTP_METHOD, IResponseTemplate, Request, DEFAULT_ERROR } from "./types";

export async function requester(url: string, method: HTTP_METHOD, param: Request): Promise<IResponseTemplate> {
  try {
    const axiosOptions = {
      headers: param.headers
        ? JSON.parse(JSON.stringify(param.headers))
        : { 'Accept': 'application/json' },
      ...((method === 'POST' || method === 'PUT' || method === 'PATCH') && { data: param.body }),
    };
    const response = await axios.request<IResponseTemplate>({
      url,
      method,
      ...axiosOptions,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // console.error(`Axios error --- ${JSON.stringify(error.response.data)}`);
      const errorResponse: { status: string, type: string, reason: string, label: string } = error.response.data;
      return {
        status: errorResponse.status as status,
        reason: errorResponse.reason,
        type: errorResponse.type as errortype,
      };
    } else {
      return DEFAULT_ERROR;
    }
  }
}
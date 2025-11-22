import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const PREDICT_BASE_URL = process.env.NEXT_PUBLIC_PREDICT_BASE_URL as string;

// Generic API response type
interface ApiResponse<T = any> {
  status: number;
  [key: string]: any;
}

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

// Extended config with `withAuth` and `predict` flag
interface ExtendedConfig extends AxiosRequestConfig {
  withAuth?: boolean;
  accessToken?: string;
  predict?: boolean; // <-- new flag
}

const CommonApiRequest = async <T = any>(
  method: HttpMethod,
  endpoint: string,
  data: Record<string, any> = {},
  setLoading?: (loading: boolean) => void,
  config: ExtendedConfig = {},
): Promise<ApiResponse<T>> => {
  if (setLoading) setLoading(true);

  try {
    // Switch base URL if predict flag is true
    const baseURL = config?.predict ? PREDICT_BASE_URL : BASE_URL;
    const url = `${baseURL}${endpoint}`;

    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data: method.toLowerCase() === 'get' ? undefined : data,
      params: method.toLowerCase() === 'get' ? data : undefined,
      headers: {
        ...(config.withAuth !== false && config.accessToken
          ? { Authorization: `Bearer ${config.accessToken}` }
          : {}),
        ...config.headers,
      },
      ...config,
    });

    return {
      ...response.data,
      data: response.data,
      status: 200,
    };
  } catch (error: any) {
    return {
      ...(error.response?.data || {}),
      status: error.response?.status ?? 500,
    };
  } finally {
    if (setLoading) setLoading(false);
  }
};

export default CommonApiRequest;

import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'https://ai-sales-api-poc-production.up.railway.app', // your proxy or production base
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function registerApiInterceptors(getToken: () => string | null, onUnauthorized: () => void) {
  ApiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  ApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );
}

export default ApiClient;

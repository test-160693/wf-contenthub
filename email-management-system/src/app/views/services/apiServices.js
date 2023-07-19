import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:4000'
});

apiService.interceptors.request.use(
    config => {
      const token = localStorage.getItem('tenant_name');
      if (token) {
        config.headers['tenant_name'] = `${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

apiService.interceptors.response.use(
    response => {
        // Handle successful responses
        console.log('Response:', response.headers);
        return response;
      },
      error => {
        // Handle errors
        console.error('Error:', error);
        return Promise.reject(error);
      }
);

export default apiService;
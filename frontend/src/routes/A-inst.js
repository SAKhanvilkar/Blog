import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
    async (config) => {
        return config; // Do NOT call useAuth here
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
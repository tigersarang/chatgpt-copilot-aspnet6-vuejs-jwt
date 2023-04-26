import axios from "axios";
import { getRefreshToken, getToken, saveRefreshToken, saveToken } from "./auth";

const API_URL = "https://localhost:7009/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
},
    async (error) => {
        const originalRequest = error.config;

        if (error.code == 'ERR_NETWORK') {
            originalRequest._retry = true;


            const refreshToken = getRefreshToken();

            if (!refreshToken || refreshToken == "undefined") {
                window.location.href = "/login";
            } else {
                try {
                    const response = await api.post("/auth/refresh", { refreshToken });
                    saveToken(response.data.token);
                    return api(originalRequest);
                } catch (error) {
                    removeToken();
                    removeRefreshToken();
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    });

export default api;    
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

const baseURL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

export const instance = () => {
    return axios.create({ baseURL: baseURL });
};

const withAuth = (instance: AxiosInstance) => {
    if (typeof window !== "undefined") {
        const userToken = getCookie("user");
        instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers["Authorization"] = userToken
                    ? `Bearer ${userToken}`
                    : "";
                return config;
            },
        );
    }

    return instance;
};

export const authInstance = withAuth(instance());

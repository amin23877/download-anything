import Axios from "axios";

// import { getToken, StorageKey } from "./";

export const apiAgent = Axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_HOST}`,
});

apiAgent.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            // config.headers.Authorization = `Bearer ${getToken()}`;
        }
        config.headers["ngrok-skip-browser-warning"] = true;
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

apiAgent.interceptors.response.use(
    (config) => config,
    (error) => {
        if (error?.response?.status === 401) {
            // localStorage.removeItem(StorageKey);
            // localStorage.removeItem("role");
        }

        return Promise.reject(error);
    }
);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiAgent } from "./config";
import { AxiosRequestConfig, AxiosResponse } from "axios";

// export const StorageKey = "session";

// export const getToken = () => {
//     const token = localStorage.getItem(StorageKey);
//     return token || null;
// };

export const fetcher = async (url: string) => {
    try {
        const resp = await get(url);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};

const onSuccess = (response: AxiosResponse<any>) => {
    return response.data;
};

const onError = (error: any) => {
    if (error.response) {
        console.error({ response: error.response, config: error.config });
        // toast.error(error.response.data.message || error.response.statusText);
        if (error.response.status === 401) {
            window.location.replace("/logout");
        }
    } else {
        console.error("Error Message: ", error.message);
        // toast.error(error.message);
    }

    return Promise.reject(error.response || error.message);
};

export const get = async (path: string, config?: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse<any>) => {
        if (
            response.headers &&
            response.headers["content-type"].indexOf("application/json") !== -1
        ) {
            return response.data;
        }
        throw new Error(
            `The response of this API endpoint is not JSON, URL: ${response.config.url}`
        );
    };

    try {
        const response = await apiAgent.get(path, config);
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};

export const delete_ = async (
    path: string,
    params: AxiosRequestConfig["params"] = null,
    data: any = null
) => {
    const headers = {};

    try {
        const response = await apiAgent.delete(path, {
            params,
            headers,
            data,
        });
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
};

export async function post<T>(
    path: string,
    data: any,
    header?: any,
    params?: any
) {
    const headers = {
        "Content-Type": "application/json",
        ...header,
    };

    try {
        const response = await apiAgent.post<T>(path, data, {
            headers,
            params,
        });
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
}

export async function put(
    path: string,
    data: any,
    headers = { "Content-Type": "application/json" },
    params?: any
) {
    try {
        const response = await apiAgent.put(path, data, {
            headers,
            params,
        });
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
}

export async function patch(
    path: string,
    data: any,
    headers = { "Content-Type": "application/json" },
    params?: any
) {
    try {
        const response = await apiAgent.patch(path, data, {
            headers,
            params,
        });
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
}

export function uploadFile(name: string, file: any) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sampleFile", name);
    formData.append("name", name);

    return post("/upload", formData);
}

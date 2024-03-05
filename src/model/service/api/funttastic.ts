import axios, {AxiosRequestConfig} from 'axios';
import fs from 'fs';
import https from 'https'; // Corrected import for https.Agent

interface ExtraOptions {
    protocol?: 'http' | 'https';
    host?: string;
    port?: number | string;
    prefix?: string;
    clientCertificatePath?: string;
    clientKeyPath?: string;
    bearerToken?: string;
}

interface Options extends Omit<AxiosRequestConfig, 'httpsAgent'>, ExtraOptions {}

async function callAPI(options: Options): Promise<any> {
    const {
        bearerToken,
        ...axiosOptions
    } = options;

    axiosOptions.baseURL = '/api'

    const headers = {
        'Content-Type': 'application/json',
        ...(bearerToken ? { 'Authorization': `Bearer ${bearerToken}` } : {}),
        ...axiosOptions.headers,
    };

    const config = {
        ...axiosOptions,
        headers,
    }

    try {
        const response = await axios(config);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}, Response: ${error.response?.data}`);
        }

        throw error;
    }
}


export const apiPostAuthLogin = async (username?: string, password?: string) => {
    if (!username)
        username = import.meta.env.VITE_ADMIN_USERNAME;

    if (!password)
        password = import.meta.env.VITE_ADMIN_USERNAME;

    return callAPI({
        method: "POST",
        url: "/auth/login",
        data: { username, password },
    });
}

export const apiGetAuthToken = async () => {
    return callAPI({
        method: "GET",
        url: "/auth/token",
    });
}

export const apiGetServiceStatus = async (id?: string) => {
    return callAPI({
        method: "GET",
        url: "/service/status",
        data: { id }
    });
}

export const apiPostServiceStart = async (id?: string) => {
    return callAPI({
        method: "POST",
        url: "/service/start",
        data: { id }
    });
}

export const apiPostServiceStop = async (id?: string) => {
    return callAPI({
        method: "POST",
        url: "/service/stop",
        data: { id }
    });
}

export const apiGetStrategyStatus = async (strategy?: string, version?: string, id?: string) => {
    return callAPI({
        method: "GET",
        url: "/strategy/status",
        data: { strategy, version, id }
    });
}

export const apiPostStrategyStart = async (strategy?: string, version?: string, id?: string) => {
    return callAPI({
        method: "POST",
        url: "/strategy/start",
        data: { strategy, version, id }
    });
}

export const apiPostStrategyStop = async (strategy?: string, version?: string, id?: string) => {
    return callAPI({
        method: "POST",
        url: "/strategy/stop",
        data: { strategy, version, id }
    });
}

export const apiGetStrategyWorkerStatus = async (strategy?: string, version?: string, id?: string, workerId?: string) => {
    return callAPI({
        method: "GET",
        url: "/strategy/worker/status",
        data: { strategy, version, id, workerId }
    });
}

export const apiPostStrategyWorkerStart = async (strategy?: string, version?: string, id?: string, workerId?: string) => {
    return callAPI({
        method: "POST",
        url: "/strategy/worker/start",
        data: { strategy, version, id, workerId }
    });
}

export const apiPostStrategyWorkerStop = async (strategy?: string, version?: string, id?: string, workerId?: string) => {
    return callAPI({
        method: "POST",
        url: "/strategy/worker/stop",
        data: { strategy, version, id, workerId }
    });
}

export const apiPostAddWallet = async (privateKey: string) => {
    return callAPI({
        method: "POST",
        url: "/wallet/add",
        data: {
            chain: "kujira",
            network: "testnet",
            connector: "kujira",
            privateKey: privateKey,
            accountNumber: 0
        },
    });
}

export const apiDeleteRemoveWallet = async (publicKey: string) => {
    return callAPI({
        method: "DELETE",
        url: "/wallet/remove",
        data: {
            "chain": "kujira",
            "address": publicKey
        },
    });
}

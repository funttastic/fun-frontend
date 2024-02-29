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
        protocol = "https",
        host = "localhost",
        port = import.meta.env.VITE_FUN_CLIENT_PORT || '50001',
        prefix = '',
        clientCertificatePath,
        clientKeyPath,
        bearerToken,
        ...axiosOptions
    } = options;

    const baseURL = `${protocol}://${host}:${port}${prefix}`;
    const headers = {
        'Content-Type': 'application/json',
        ...(bearerToken ? { 'Authorization': `Bearer ${bearerToken}` } : {}),
        ...axiosOptions.headers,
    };

    const httpsAgent = clientCertificatePath && clientKeyPath ? new https.Agent({
        cert: fs.readFileSync(clientCertificatePath),
        key: fs.readFileSync(clientKeyPath),
    }) : undefined;

    try {
        const response = await axios({
            ...axiosOptions,
            baseURL,
            headers,
            httpsAgent,
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}, Response: ${error.response?.data}`);
        }

        throw error;
    }
}

export const apiPostAddWallet = async (password: string) => {
    return callAPI({
        method: "POST",
        url: "/wallet/add",
        data: { password },
    });
}

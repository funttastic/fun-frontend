import axios, {AxiosRequestConfig} from 'axios';
import fs from 'fs';

interface ExtraOptions {
    protocol?: 'http' | 'https';
    host?: string;
    port?: number;
    prefix?: string;
    clientCertificatePath?: string;
    clientKeyPath?: string;
    bearerToken?: string;
}

interface Options extends AxiosRequestConfig, ExtraOptions {}

async function callAPI(options: Options): Promise<any> {
    try {
        if (!options.protocol) options.protocol = "https"
        if (!options.host) options.host = "localhost"
        if (!options.port) options.port = import.meta.env.VITE_FUN_CLIENT_PORT || '50001';
        if (!options.baseURL) options.baseURL = `${options.protocol}://${options.host}:${options.port}${options.prefix}`;
        if (!options.headers) options.headers = { 'Content-Type': 'application/json' }

        if (options.clientCertificatePath && options.clientKeyPath) {
            options.httpsAgent = new axios.HttpsAgent({
                cert: fs.readFileSync(options.clientCertificatePath),
                key: fs.readFileSync(options.clientKeyPath),
            });
        }

        if (options.bearerToken) {
            options.headers["Authorization"] = `Bearer ${options.bearerToken}`;
        }

        const response = await axios(options);

        if (response.status < 200 || response.status > 299) {
            throw new Error(`Request failed. Status ${response.status}. Response: ${response.data}`);
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}`);
        } else {
            throw error;
        }
    }
}

export const apiPostAddWallet = async (password: string) => {
    return await callAPI({
        method: "POST",
        url: "/wallet/add",
        data: { password }

    })
}

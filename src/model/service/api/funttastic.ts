import axios, {AxiosRequestConfig} from 'axios'

import appConfig from '@/configs/app.config'
import {Environment} from '@/model/enum/environment'
import ApiService from "@/services/ApiService";

const environment = appConfig.enableMock ? Environment.development : Environment.production;

interface ExtraOptions {
    protocol?: 'http' | 'https'
    host?: string
    port?: number | string
    prefix?: string
    clientCertificatePath?: string
    clientKeyPath?: string
    bearerToken?: string
}

interface Options extends Omit<AxiosRequestConfig, 'httpsAgent'>, ExtraOptions {}

const callAPIorMockAPI = async (options: Options): Promise<any> => {
    if (environment == Environment.development) {
        return await callMockAPI(options)
    }else {
        return callAPI(options)
    }
}

async function callMockAPI(options: Options): Promise<any> {
    return await ApiService.fetchData(options)
}

async function callAPI(options: Options): Promise<any> {
    const {
        bearerToken,
        ...axiosOptions
    } = options

    axiosOptions.baseURL = '/api'

    const headers = {
        'Content-Type': 'application/json',
        ...(bearerToken ? { 'Authorization': `Bearer ${bearerToken}` } : {}),
        ...axiosOptions.headers,
    }

    axiosOptions.withCredentials = true

    const config = {
        ...axiosOptions,
        headers,
    }

    try {
        const response = await axios(config)

        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}, Response: ${error.response?.data}`)
        }

        throw error
    }
}

export const apiPostAuthSignUp = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/auth/signUp",
        data: data,
    })
}

export const apiPostAuthSignIn = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/auth/signIn",
        data: data,
    })
}

export const apiPostAuthSignOut = async (data?: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/auth/signOut",
        data: data
    })
}

export const apiPostAuthRefresh = async (data?: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/auth/refresh",
        data: data
    })
}

export const apiGetServiceStatus = async (data?: any) => {
    return callAPIorMockAPI({
        method: "GET",
        url: "/service/status",
        data: data
    })
}

export const apiPostServiceStart = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/service/start",
        data: data
    })
}

export const apiPostServiceStop = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/service/stop",
        data: data
    })
}

export const apiGetStrategyStatus = async (data: any) => {
    return callAPIorMockAPI({
        method: "GET",
        url: "/strategy/status",
        data: data
    })
}

export const apiPostStrategyStart = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/strategy/start",
        data: data
    })
}

export const apiPostStrategyStop = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/strategy/stop",
        data: data
    })
}

export const apiGetStrategyWorkerStatus = async (data: any) => {
    return callAPIorMockAPI({
        method: "GET",
        url: "/strategy/worker/status",
        data: data
    })
}

export const apiPostStrategyWorkerStart = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/strategy/worker/start",
        data: data
    })
}

export const apiPostStrategyWorkerStop = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/strategy/worker/stop",
        data: data
    })
}

export const apiPostAddWallet = async (data: any) => {
    return callAPIorMockAPI({
        method: "POST",
        url: "/wallet/add",
        data: {
            chain: "kujira",
            network: "testnet",
            connector: "kujira",
            privateKey: data,
            accountNumber: 0
        },
    })
}

export const apiDeleteRemoveWallet = async (data: any) => {
    return callAPIorMockAPI({
        method: "DELETE",
        url: "/wallet/remove",
        data: {
            "chain": "kujira",
            "address": data
        },
    })
}

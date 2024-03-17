import axios, {AxiosRequestConfig} from 'axios'

import appConfig from '@/configs/app.config'
import {Environment} from '@/model/enum/environment'
import ApiService from '@/services/ApiService';

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

const callAPIorMockAPI = async (options: Options, handleUnAuthorized?: () => void): Promise<any> => {
    try {
        if (environment == Environment.development) {
            return await callMockAPI(options)
        } else {
            return await callAPI(options)
        }
    } catch (exception) {
        if (axios.isAxiosError(exception)) {
            if (exception?.response?.status == 401) {
                if (handleUnAuthorized) handleUnAuthorized()

                throw exception
            }
        }

        throw exception
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
        // if (axios.isAxiosError(error)) {
        //     throw error
        // }

        throw error
    }
}

export const apiPostAuthSignUp = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/auth/signUp',
        data: data,
    }, handleUnAuthorized)
}

export const apiPostAuthSignIn = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/auth/signIn',
        data: data,
    }, handleUnAuthorized)
}

export const apiPostAuthSignOut = async (data?: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/auth/signOut',
        data: data
    }, handleUnAuthorized)
}

export const apiPostAuthRefresh = async (data?: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/auth/refresh',
        data: data
    }, handleUnAuthorized)
}

export const apiGetServiceStatus = async (data?: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'GET',
        url: '/service/status',
        data: data
    }, handleUnAuthorized)
}

export const apiPostServiceStart = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/service/start',
        data: data
    }, handleUnAuthorized)
}

export const apiPostServiceStop = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/service/stop',
        data: data
    }, handleUnAuthorized)
}

export const apiGetStrategyStatus = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'GET',
        url: '/strategy/status',
        data: data
    }, handleUnAuthorized)
}

export const apiPostStrategyStart = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/strategy/start',
        data: data
    }, handleUnAuthorized)
}

export const apiPostStrategyStop = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/strategy/stop',
        data: data
    }, handleUnAuthorized)
}

export const apiGetStrategyWorkerStatus = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'GET',
        url: '/strategy/worker/status',
        data: data
    }, handleUnAuthorized)
}

export const apiPostStrategyWorkerStart = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/strategy/worker/start',
        data: data
    }, handleUnAuthorized)
}

export const apiPostStrategyWorkerStop = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/strategy/worker/stop',
        data: data
    }, handleUnAuthorized)
}

export const apiPostAddWallet = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'POST',
        url: '/hummingbot/gateway/wallet/add',
        data: {
            chain: 'kujira',
            network: 'testnet',
            connector: 'kujira',
            privateKey: data,
            accountNumber: 0
        },
    }, handleUnAuthorized)
}

export const apiDeleteRemoveWallet = async (data: any, handleUnAuthorized?: () => void) => {
    return await callAPIorMockAPI({
        method: 'DELETE',
        url: '/hummingbot/gateway/wallet/remove',
        data: {
            'chain': 'kujira',
            'address': data
        },
    }, handleUnAuthorized)
}

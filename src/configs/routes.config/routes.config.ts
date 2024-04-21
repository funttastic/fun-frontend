import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'files',
        path: '/files',
        component: lazy(() => import('@/views/logs/Files')),
        authority: [],
    },
    {
        key: 'terms-and-conditions',
        path: '/terms-and-conditions',
        component: lazy(() => import('@/views/TermsAndConditions')),
        authority: [],
    },


    {
        key: 'All.all',
        path: '/logs/all/all',
        component: lazy(() => import('@/views/logs/All/All')),
        authority: [],
    },
    {
        key: 'All.back',
        path: '/logs/all/back',
        component: lazy(() => import('@/views/logs/All/Back')),
        authority: [],
    },
    {
        key: 'All.front',
        path: '/logs/all/front',
        component: lazy(() => import('@/views/logs/All/Front')),
        authority: [],
    },


    {
        key: 'Fun-Client.all',
        path: '/logs/fun-client/all',
        component: lazy(() => import('@/views/logs/Fun-Client/All')),
        authority: [],
    },
    {
        key: 'Fun-Client.back',
        path: '/logs/fun-client/back',
        component: lazy(() => import('@/views/logs/Fun-Client/Back')),
        authority: [],
    },
    {
        key: 'Fun-Client.front',
        path: '/logs/fun-client/front',
        component: lazy(() => import('@/views/logs/Fun-Client/Front')),
        authority: [],
    },


    {
        key: 'FileBrowser.all',
        path: '/logs/filebrowser/all',
        component: lazy(() => import('@/views/logs/FileBrowser/All')),
        authority: [],
    },
    {
        key: 'FileBrowser.back',
        path: '/logs/filebrowser/back',
        component: lazy(() => import('@/views/logs/FileBrowser/Back')),
        authority: [],
    },
    {
        key: 'FileBrowser.front',
        path: '/logs/filebrowser/front',
        component: lazy(() => import('@/views/logs/FileBrowser/Front')),
        authority: [],
    },


    {
        key: 'Hb-Gateway.all',
        path: '/logs/hb-gateway/all',
        component: lazy(() => import('@/views/logs/Hb-Gateway/All')),
        authority: [],
    },
    {
        key: 'Hb-Gateway.back',
        path: '/logs/hb-gateway/back',
        component: lazy(() => import('@/views/logs/Hb-Gateway/Back')),
        authority: [],
    },
    {
        key: 'Hb-Gateway.front',
        path: '/logs/hb-gateway/front',
        component: lazy(() => import('@/views/logs/Hb-Gateway/Front')),
        authority: [],
    },


    {
        key: 'Hb-Client.all',
        path: '/logs/hb-client/all',
        component: lazy(() => import('@/views/logs/Hb-Client/All')),
        authority: [],
    },
    {
        key: 'Hb-Client.back',
        path: '/logs/hb-client/back',
        component: lazy(() => import('@/views/logs/Hb-Client/Back')),
        authority: [],
    },
    {
        key: 'Hb-Client.front',
        path: '/logs/hb-client/front',
        component: lazy(() => import('@/views/logs/Hb-Client/Front')),
        authority: [],
    },

    {
        key: 'Fun-Frontend.all',
        path: '/logs/fun-frontend/all',
        component: lazy(() => import('@/views/logs/Fun-Frontend/All')),
        authority: [],
    },
    {
        key: 'Fun-Frontend.back',
        path: '//logs/fun-frontend/back',
        component: lazy(() => import('@/views/logs/Fun-Frontend/Back')),
        authority: [],
    },
    {
        key: 'Fun-Frontend.Front',
        path: '//logs/fun-frontend/front',
        component: lazy(() => import('@/views/logs/Fun-Frontend/Front')),
        authority: [],
    },

]

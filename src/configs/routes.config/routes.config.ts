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
        path: '/AllAll',
        component: lazy(() => import('@/views/logs/All/All')),
        authority: [],
    },
    {
        key: 'All.back',
        path: '/AllBack',
        component: lazy(() => import('@/views/logs/All/Back')),
        authority: [],
    },
    {
        key: 'All.front',
        path: '/AllFront',
        component: lazy(() => import('@/views/logs/All/Front')),
        authority: [],
    },


    {
        key: 'Fun-Client.all',
        path: '/All',
        component: lazy(() => import('@/views/logs/Fun-Client/All')),
        authority: [],
    },
    {
        key: 'Fun-Client.back',
        path: '/Back',
        component: lazy(() => import('@/views/logs/Fun-Client/Back')),
        authority: [],
    },
    {
        key: 'Fun-Client.front',
        path: '/Front',
        component: lazy(() => import('@/views/logs/Fun-Client/Front')),
        authority: [],
    },


    {
        key: 'FileBrowser.all',
        path: '/All',
        component: lazy(() => import('@/views/logs/File-Browser/All')),
        authority: [],
    },
    {
        key: 'FileBrowser.back',
        path: '/Back',
        component: lazy(() => import('@/views/logs/File-Browser/Back')),
        authority: [],
    },
    {
        key: 'FileBrowser.front',
        path: '/Front',
        component: lazy(() => import('@/views/logs/File-Browser/Front')),
        authority: [],
    },


    {
        key: 'Hb-Gateway.all',
        path: '/All',
        component: lazy(() => import('@/views/logs/Hb-Gateway/All')),
        authority: [],
    },
    {
        key: 'Hb-Gateway.back',
        path: '/Back',
        component: lazy(() => import('@/views/logs/Hb-Gateway/Back')),
        authority: [],
    },
    {
        key: 'Hb-Gateway.front',
        path: '/Front',
        component: lazy(() => import('@/views/logs/Hb-Gateway/Front')),
        authority: [],
    },


    {
        key: 'Hb-Client.all',
        path: '/All',
        component: lazy(() => import('@/views/logs/Hb-Client/All')),
        authority: [],
    },
    {
        key: 'Hb-Client.back',
        path: '/Back',
        component: lazy(() => import('@/views/logs/Hb-Client/Back')),
        authority: [],
    },
    {
        key: 'Hb-Client.front',
        path: '/Front',
        component: lazy(() => import('@/views/logs/Hb-Client/Front')),
        authority: [],
    },

    {
        key: 'Fun-Frontend.all',
        path: '/All',
        component: lazy(() => import('@/views/logs/Fun-Frontend/All')),
        authority: [],
    },
    {
        key: 'Fun-Frontend.back',
        path: '/Back',
        component: lazy(() => import('@/views/logs/Fun-Frontend/Back')),
        authority: [],
    },
    {
        key: 'Fun-Frontend.Front',
        path: '/Front',
        component: lazy(() => import('@/views/logs/Fun-Frontend/Front')),
        authority: [],
    },

]

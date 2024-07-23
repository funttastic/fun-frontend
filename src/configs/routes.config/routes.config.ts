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
        component: lazy(() => import('../../views/Files')),
        authority: [],
    },
    {
        key: 'wizardsteps',
        path: '/wizard',
        component: lazy(() => import('../../views/wizard/WizardSteps')),
        authority: [],
    },
    {
        key: 'terms-and-conditions',
        path: '/terms-and-conditions',
        component: lazy(() => import('@/views/TermsAndConditions')),
        authority: [],
    },


    {
        key: 'docs-videoTutorial',
        path: 'video-tutorial/video-tutorial',
        component: lazy(() => import('@/views/docs/VideoTutorial/VideoTutorial')),
        authority: [],
    },
        {
        key: 'docs-tutorial',
        path: 'tutorial/tutorial',
        component: lazy(() => import('@/views/docs/Tutorial/Tutorial')),
        authority: [],
    },
    {
        key: 'docs-telegramBot',
        path: 'telegram-bot/telegram-bot',
        component: lazy(() => import('@/views/docs/TelegramBot/TelegramBot')),
        authority: [],
    },

    {
        key: 'all.all',
        path: '/logs/all/all',
        component: lazy(() => import('@/views/logs/All/All')),
        authority: [],
    },
    {
        key: 'all.front',
        path: '/logs/all/front',
        component: lazy(() => import('@/views/logs/All/Front')),
        authority: [],
    },
    {
        key: 'all.back',
        path: '/logs/all/back',
        component: lazy(() => import('@/views/logs/All/Back')),
        authority: [],
    },


    {
        key: 'Fun-Client.all',
        path: '/logs/fun-client/all',
        component: lazy(() => import('@/views/logs/Fun-Client/All')),
        authority: [],
    },
    {
        key: 'fun-client.back',
        path: '/logs/fun-client/back',
        component: lazy(() => import('@/views/logs/Fun-Client/Back')),
        authority: [],
    },
    {
        key: 'fun-client.front',
        path: '/logs/fun-client/front',
        component: lazy(() => import('@/views/logs/Fun-Client/Front')),
        authority: [],
    },


    {
        key: 'filebrowser.all',
        path: '/logs/filebrowser/all',
        component: lazy(() => import('@/views/logs/FileBrowser/All')),
        authority: [],
    },
    {
        key: 'filebrowser.back',
        path: '/logs/filebrowser/back',
        component: lazy(() => import('@/views/logs/FileBrowser/Back')),
        authority: [],
    },
    {
        key: 'filebrowser.front',
        path: '/logs/filebrowser/front',
        component: lazy(() => import('@/views/logs/FileBrowser/Front')),
        authority: [],
    },


    {
        key: 'hb-gateway.all',
        path: '/logs/hb-gateway/all',
        component: lazy(() => import('@/views/logs/HB-Gateway/All')),
        authority: [],
    },
    {
        key: 'hb-gateway.back',
        path: '/logs/hb-gateway/back',
        component: lazy(() => import('@/views/logs/HB-Gateway/Back')),
        authority: [],
    },
    {
        key: 'hb-gateway.front',
        path: '/logs/hb-gateway/front',
        component: lazy(() => import('@/views/logs/HB-Gateway/Front')),
        authority: [],
    },


    {
        key: 'hb-client.all',
        path: '/logs/hb-client/all',
        component: lazy(() => import('@/views/logs/HB-Client/All')),
        authority: [],
    },
    {
        key: 'hb-client.back',
        path: '/logs/hb-client/back',
        component: lazy(() => import('@/views/logs/HB-Client/Back')),
        authority: [],
    },
    {
        key: 'hb-client.front',
        path: '/logs/hb-client/front',
        component: lazy(() => import('@/views/logs/HB-Client/Front')),
        authority: [],
    },


    {
        key: 'fun-frontend.all',
        path: '/logs/fun-frontend/all',
        component: lazy(() => import('@/views/logs/Fun-Frontend/All')),
        authority: [],
    },
    {
        key: 'fun-frontend.back',
        path: '//logs/fun-frontend/back',
        component: lazy(() => import('@/views/logs/Fun-Frontend/Back')),
        authority: [],
    },
    {
        key: 'fun-frontend.Front',
        path: '//logs/fun-frontend/front',
        component: lazy(() => import('@/views/logs/Fun-Frontend/Front')),
        authority: [],
    },

]

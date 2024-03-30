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
        component: lazy(() => import('@/views/Files')),
        authority: [],
    },
    {
        key: 'Logs',
        path: '/Logs',
        component: lazy(() => import('@/views/Logs')),
        authority: [],
    },
    {
        key: 'terms-and-conditions',
        path: '/terms-and-conditions',
        component: lazy(() => import('@/views/TermsAndConditions')),
        authority: [],
    },
]

export const signInUserData = [
    {
        id: '21',
        avatar: '/img/avatars/thumb-1.jpg',
        userName: 'Carolyn Perkins',
        email: 'carolyn.p@elstar.com',
        authority: ['admin', 'user'],
        password: '123Qwe',
        accountUserName: 'admin',
    },
]

export enum Statuses {
    STOPPED = 'stopped',
    STARTING = 'starting',
    IDLE = 'idle',
    RUNNING = 'running',
    STOPPING = 'stopping',
    UNKNOWN = 'unknown',
}

export enum StatusesMessages {
    STOPPED = 'Stopped.',
    STARTING = 'Starting...',
    IDLE = 'Idle.',
    RUNNING = 'Running...',
    STOPPING = 'Stopping...',
    UNKNOWN = 'Unknown.',
}

export const endpoints = {
    '/wallet/add': {
        success: {
            address: 'kujira0d6ld2s0adsh5qsmt3lq4tabqgvxd3jdrk8z1kj',
        },
        error: new Error('Kujira wallet requires an account number.'),
    },
    '/status': {
        'fun-client': {
            status: '',
            message: '',
        },
        'hb-gateway': {
            status: '',
            message: '',
        },
        'hb-client': {
            status: '',
            message: '',
        },
    },
}

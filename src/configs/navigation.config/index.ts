import {NAV_ITEM_TYPE_COLLAPSE, NAV_ITEM_TYPE_ITEM,} from '@/constants/navigation.constant'
import type {NavigationTree} from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
  {
    key: 'home',
    path: '/home',
    title: 'Home',
    translateKey: 'nav.home',
    icon: 'home',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: 'files',
    path: '/files',
    title: 'Files',
    translateKey: 'nav.files',
    icon: 'filebrowser',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },

  // {
  //   key: 'wizardsteps',
  //   path: '/wizard',
  //   title: 'Wizard',
  //   translateKey: 'nav.wizardsteps',
  //   icon: 'wizard',
  //   type: NAV_ITEM_TYPE_ITEM,
  //   authority: [],
  //   subMenu: [],
  // },

  {
    key: 'docs',
    path: '',
    title: 'Docs',
    translateKey: 'nav.docs',
    icon: 'docs',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
      {
        key: 'docs-videoTutorial',
        path: 'video-tutorial/video-tutorial',
        title: 'Video Tutorial',
        translateKey: 'nav.video-tutorial',
        icon: 'logs',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [ ]
      },
      {
        key: 'docs-tutorial',
        path: 'tutorial/tutorial',
        title: 'Tutorial',
        translateKey: 'nav.tutorial',
        icon: 'logs',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [ ]
      },
      {
        key: 'docs-telegramBot',
        path: 'telegram-bot/telegram-bot',
        title: 'Telegram Bot',
        translateKey: 'nav.telegramBot',
        icon: 'logs',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [ ]
      }

    ]
  },

  {
    key: 'logs',
    path: '',
    title: 'Logs',
    translateKey: 'nav.logs',
    icon: 'logs',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
      {
        key: 'All.all',
        path: '',
        title: 'ALL',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [],
      },
      {
        key: 'all.all',
        path: '/logs/all/all',
        title: 'All',
        translateKey: 'nav.all.tsx',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'all.front',
        path: '/logs/all/front',
        title: 'Front',
        translateKey: 'nav.front.tsx',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'all.back',
        path: '/logs/all/back',
        title: 'Back',
        translateKey: 'nav.Back.tsx',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },


      {
        key: 'fun-client',
        path: '',
        title: 'FUN-CLIENT',
        isExternalLink: false,
        translateKey: 'nav.Fun-client',
        icon: 'client',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [],
      },
      {
        key: 'fun-client.all',
        path: '/logs/fun-client/all',
        title: 'All',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'fun-client.front',
        path: '/logs/fun-client/front',
        title: 'Front',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'fun-client.back',
        path: '/logs/fun-client/back',
        title: 'Back',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },


      {
        key: 'fun-frontend',
        path: '',
        title: 'FUN-FRONTEND',
        isExternalLink: false,
        translateKey: 'nav.fun-frontend',
        icon: 'frontend',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [],
      },
      {
        key: 'fun-frontend.all',
        path: '/logs/fun-frontend/all',
        title: 'All',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'fun-frontend.front',
        path: '/logs/fun-frontend/front',
        title: 'Front',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'fun-frontend.back',
        path: '/logs/fun-frontend/back',
        title: 'Back',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },


      {
        key: 'hb-client',
        path: '',
        title: 'HB-CLIENT',
        isExternalLink: false,
        translateKey: 'nav.HB-client',
        icon: 'hbClient',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu:  [],
      },
      {
        key: 'hb-client.all',
        path: '/logs/hb-client/all',
        title: 'All',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'hb-client.front',
        path: '/logs/hb-client/front',
        title: 'Front',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'hb-client.back',
        path: '/logs/hb-client/back',
        title: 'Back',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },


      {
        key: 'hb-gateway',
        path: '',
        title: 'HB-GATEWAY',
        isExternalLink: false,
        translateKey: 'nav.Hb-gateway',
        icon: 'gateway',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [],
      },
      {
        key: 'hb-gateway.all',
        path: '/logs/hb-gateway/all',
        title: 'All',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'hb-gateway.front',
        path: '/logs/hb-gateway/front',
        title: 'Front',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'hb-gateway.back',
        path: '/logs/hb-gateway/back',
        title: 'Back',
        isExternalLink: false,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },


      {
        key: 'filebrowser',
        path: '',
        title: 'FILEBROWSER',
        isExternalLink: false,
        translateKey: 'nav.File-browser',
        icon: 'filebrowser',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [],

      },
      {
        key: 'filebrowser.all',
        path: '/logs/filebrowser/all',
        title: 'All',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'filebrowser.front',
        path: '/logs/filebrowser/front',
        title: 'Front',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'filebrowser.back',
        path: '/logs/filebrowser/back',
        title: 'Back',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
    ],
  },

  {
    key: 'funttastic',
    path: '',
    title: 'Funttastic',
    translateKey: 'nav.collapseMenu.collapseMenu',
    icon: 'fun',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
      {
        key: 'funttasticDiscord',
        path: 'https://discord.com/invite/zNzpPhHF86',
        title: 'Discord',
        isExternalLink: true,
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'funttasticTelegram',
        path: 'https://t.me/FunttasticLabs',
        isExternalLink: true,
        title: 'Telegram',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'funttasticGithub',
        path: 'https://github.com/funttastic/',
        isExternalLink: true,
        title: 'Github',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'funttasticWebsite',
        path: 'https://www.funttastic.com/',
        isExternalLink: true,
        title: 'Website',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'funttasticInstagram',
        path: 'https://www.instagram.com/funttastic/',
        isExternalLink: true,
        title: 'Instagram',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'funttasticMail',
        path: 'mailto:contact@funttastic.com',
        title: 'E-Mail',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: 'kujira',
    path: '',
    title: 'Kujira',
    translateKey: '',
    icon: 'kujira',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
      {
        key: 'kujiraWebsite',
        path: 'https://kujira.network/',
        isExternalLink: true,
        title: 'Website',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'kujiraDapps',
        path: 'https://kujira.network/dapps',
        isExternalLink: true,
        title: 'Kujira dApps',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'kujiraFIN',
        path: 'https://fin.kujira.network/',
        isExternalLink: true,
        title: 'Kujira FIN',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'kujiraBLUE',
        path: 'https://blue.kujira.network/',
        isExternalLink: true,
        title: 'Kujira BLUE',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'kujiraFinder',
        path: 'https://finder.kujira.network/kaiyo-1',
        isExternalLink: true,
        title: 'Kujira Finder',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'kujiraEcosystem',
        path: 'https://kujira.network/ecosystem',
        isExternalLink: true,
        title: 'Kujira Ecosystem',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'kujiraDocumentation',
        path: 'https://docs.kujira.app/introduction/readme',
        isExternalLink: true,
        title: 'Documentation',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
    ],
  },
  {
    key: 'hummingbot',
    path: '',
    title: 'Hummingbot',
    translateKey: '',
    icon: 'hummingbot',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [
      {
        key: 'hummingbotWebsite',
        path: 'https://hummingbot.org/',
        isExternalLink: true,
        title: 'Website',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
      {
        key: 'hummingbotGuide',
        path: 'https://hummingbot.org/docs/',
        isExternalLink: true,
        title: 'Hummingbot Installation Guide',
        translateKey: '',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
      },
    ],
  },
]

export default navigationConfig

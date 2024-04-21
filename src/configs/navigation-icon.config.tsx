import { HiOutlineHome } from 'react-icons/hi'
import fun from '../../public/img/nav-icons/fun_logo.png'
import kuji from '../../public/img/nav-icons/kuji.svg'
import hummingbot from '../../public/img/nav-icons/hummingbot-logo.svg'
import filebrowser from '../../public/img/nav-icons/filebrowser-logo.svg'
import home from '../../public/img/nav-icons/home-icon.png'
import all from '../../public/img/nav-icons/all_logo.png'
import client from '../../public/img/nav-icons/client_logo.svg'
import frontend from '../../public/img/nav-icons/frontend_logo.svg'
import gateway from '../../public/img/nav-icons/gateway_logo.svg'
import hbClient from '../../public/img/nav-icons/hb-cllient_logo.svg'
import logs from '../../public/img/nav-icons/logs_logo.png';

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <img src={home} alt="home" width={18} height={18} />,
    all: <img src={all} alt="all" width={18} height={18} />,
    client: <img src={client} alt="client" width={18} height={18} />,
    frontend: <img src={frontend} alt="frontend" width={18} height={18} />,
    gateway: <img src={gateway} alt="gateway" width={18} height={18} />,
    hbClient: <img src={hbClient} alt="hbClient" width={18} height={18} />,
    kujira: <img src={kuji} alt="kujira" width={18} height={18} />,
    fun: <img src={fun} alt="fun" width={18} height={18} />,
    logs: <img src={logs} alt="logs" width={18} height={18} />,
    hummingbot: (
        <img src={hummingbot} alt="hummingbot" width={18} height={18} />
    ),
    filebrowser: (
        <img src={filebrowser} alt="filebrowser" width={18} height={18} />
    ),
}

export default navigationIcon

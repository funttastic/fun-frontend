import { HiOutlineHome } from 'react-icons/hi'
import fun from '../../public/img/nav-icons/fun_logo.png'
import kuji from '../../public/img/nav-icons/kuji.svg'
import hummingbot from '../../public/img/nav-icons/hummingbot-logo.svg'
import filebrowser from '../../public/img/nav-icons/filebrowser-logo.svg'
import home from '../../public/img/nav-icons/home-icon.png'
import log from '../../public/img/nav-icons/log-icon.svg'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <img src={home} alt="home" width={25} height={25} />,
    log: <img src={log} alt="log" width={25} height={25} />,
    kujira: <img src={kuji} alt="kujira" width={25} height={25} />,
    fun: <img src={fun} alt="fun" width={25} height={25} />,
    hummingbot: (
        <img src={hummingbot} alt="hummingbot" width={25} height={25} />
    ),
    filebrowser: (
        <img src={filebrowser} alt="filebrowser" width={25} height={25} />
    ),
}

export default navigationIcon

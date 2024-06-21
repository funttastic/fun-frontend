import fun from '../../public/img/nav-icons/fun_logo.png'
import kuji from '../../public/img/nav-icons/kuji.svg'
import hummingbot from '../../public/img/nav-icons/hummingbot-logo.svg'
import filebrowser from '../../public/img/nav-icons/filebrowser-logo.svg'
import home from '../../public/img/nav-icons/home-icon.png'
import log from '../../public/img/nav-icons/Log_logo.png'
import docs from '../../public/img/nav-icons/docs_logo.png'
import wizard from '../../public/img/nav-icons/mnemonic-logo.png'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <img src={home} alt="home" width={20} height={20} />,
    kujira: <img src={kuji} alt="kujira" width={20} height={20} />,
    fun: <img src={fun} alt="fun" width={20} height={20} />,
    logs: <img src={log} alt="log" width={20} height={20} />,
    docs: <img src={docs} alt="log" width={20} height={20} />,
    wizard: <img src={wizard} alt="log" width={20} height={20} />,
    hummingbot: (
        <img src={hummingbot} alt="hummingbot" width={20} height={20} />
    ),
    filebrowser: (
        <img src={filebrowser} alt="filebrowser" width={20} height={20} />
    ),
}

export default navigationIcon

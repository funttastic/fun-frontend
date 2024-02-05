import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'
import fun from '../../public/img/logo/funttastic_with_kujira_logo_dark_mode.svg'
import kuji from '../../public/img/logo/kuji.svg'
import hummingbot from '../../public/img/logo/hummingbot-logo.svg'
import filebrowser from '../../public/img/logo/filebrowser-logo.svg'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    kujira: <img src={kuji} alt="kujira" width={25} height={25} />,
    fun: <img src={fun} alt="fun" width={25} height={25} />,
    hummingbot: (
        <img src={hummingbot} alt="hummingbot" width={25} height={25} />
    ),
    filebrowser: (
        <img src={filebrowser} alt="filebrowser" width={25} height={25} />
    ),
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon

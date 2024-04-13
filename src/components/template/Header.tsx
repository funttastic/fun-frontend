import classNames from 'classnames'
import { HEADER_HEIGHT_CLASS } from '@/constants/theme.constant'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'
import ModeSwitcher from "@/components/template/ThemeConfigurator/ModeSwitcher";
import SidePanelContent from "@/components/template/SidePanel/SidePanelContent";

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
}

const Header = (props: HeaderProps) => {
    const { headerStart, headerEnd, headerMiddle, className, container } = props

    return (
        <header className={classNames('header', className)}>
            <div
                className={classNames(
                    'header-wrapper',
                    HEADER_HEIGHT_CLASS,
                    container && 'container mx-auto',
                )}
            >
                <div className="header-action header-action-start">
                    {headerStart}
                </div>

                <div className="header-action header-action-middle">
                    {headerMiddle}
                    <img
                        alt={"image"}
                        src="/img/logo/kuji_fun_dark_mode_2_fun_logo_to_left.png"
                        width={400}
                    />
                </div>

                <div className="header-action header-action-end">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header

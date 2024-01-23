import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import ModeSwitcher from '../ThemeConfigurator/ModeSwitcher'

export type SidePanelContentProps = ThemeConfiguratorProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SidePanelContent = (props: SidePanelContentProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h6>Dark Mode</h6>
                <span>Switch theme between light and dark mode</span>
            </div>
            <ModeSwitcher />
        </div>
    )
}

export default SidePanelContent

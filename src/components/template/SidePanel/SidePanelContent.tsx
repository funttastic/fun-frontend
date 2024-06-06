import type { ThemeConfiguratorProps } from '@/components/template/ThemeConfigurator'
import ModeSwitcher from '../ThemeConfigurator/ModeSwitcher'

export type SidePanelContentProps = ThemeConfiguratorProps

const SidePanelContent = (props: SidePanelContentProps) => {
    return (
        <div className="flex items-center justify-between">
          <ModeSwitcher/>
        </div>
    )
}

export default SidePanelContent

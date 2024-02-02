import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'

export interface IFrameProps extends CommonProps {
    title: string
    src: string
}

const IFrame = ({ className, title, src }: IFrameProps) => {
    return (
        <iframe
            className={classNames('iframe', className)}
            title={title}
            src={src}
        ></iframe>
    )
}

export default IFrame

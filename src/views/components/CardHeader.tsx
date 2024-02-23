import {
    HiCheckCircle,
    HiMinusCircle,
    HiDotsCircleHorizontal,
} from 'react-icons/hi'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => ({
    status: state.app.api.funttastic.client.status,
})

const CardHeaderStructure = (props) => {
    return (
        <div className="flex items-center">
            <span className="mr-1 font-semibold">
                {props.status[props.target]}
            </span>
            <span
                className={
                    props.status[props.target] === 'running'
                        ? 'text-emerald-500 text-xl'
                        : props.status[props.target] === 'stopped'
                          ? 'text-red-500 text-xl'
                          : 'text-gray-500 text-xl'
                }
            >
                {props.status[props.target] === 'running' && (
                    <HiCheckCircle />
                )}
                {props.status[props.target] === 'stopped' && (
                    <HiMinusCircle />
                )}
                {props.status[props.target] !== 'running' &&
                    props.status[props.target] !== 'stopped' && (
                        <HiDotsCircleHorizontal />
                    )}
            </span>
        </div>
    )
}

const CardHeader = connect(mapStateToProps)(CardHeaderStructure)

export default CardHeader

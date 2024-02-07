import { connect } from 'react-redux'
import {
    HiCheckCircle,
    HiMinusCircle,
    HiDotsCircleHorizontal,
} from 'react-icons/hi'

const mapStateToProps = (state, props) => ({
    status: state.app.api.funttastic.client.status,
})

const mapDispatchToProps = (dispatch) => ({})

const HeaderExtraContent = (props) => (
    <div className="flex items-center">
        <span className="mr-1 font-semibold">{props.status.title}</span>
        <span
            className={
                props.status === 'running'
                    ? 'text-emerald-500 text-xl'
                    : props.status === 'stopped'
                      ? 'text-red-500 text-xl'
                      : 'text-gray-500 text-xl'
            }
        >
            {props.status === 'running' && <HiCheckCircle />}
            {props.status === 'stopped' && <HiMinusCircle />}
            {props.status !== 'running' && props.status !== 'stopped' && (
                <HiDotsCircleHorizontal />
            )}
        </span>
    </div>
)

const Behavior = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderExtraContent)

export default Behavior

import { connect } from 'react-redux'
import {
    HiCheckCircle,
    HiMinusCircle,
    HiDotsCircleHorizontal,
} from 'react-icons/hi'
import { apiPostStart } from '@/mock/service'

const mapStateToProps = (state, props) => ({
    status: state.app.api.funttastic.client.status,
})

const mapDispatchToProps = (dispatch) => ({
    apiPostStart(key) {
        return async () => {
            await apiPostStart({ target: 'fun-client' })
            console.log(key)
        }
    },
})

const HeaderExtraContent = (props) => (
    <div
        className="flex items-center"
        onClick={props.apiPostStart && props.apiPostStart('fun-client')}
    >
        <span className="mr-1 font-semibold">
            {props.status['fun-client'].status}
        </span>
        <span
            className={
                props.status['fun-client'].status === 'running'
                    ? 'text-emerald-500 text-xl'
                    : props.status['fun-client'].status === 'stopped'
                      ? 'text-red-500 text-xl'
                      : 'text-gray-500 text-xl'
            }
        >
            {props.status['fun-client'].status === 'running' && (
                <HiCheckCircle />
            )}
            {props.status['fun-client'].status === 'stopped' && (
                <HiMinusCircle />
            )}
            {props.status['fun-client'].status !== 'running' &&
                props.status['fun-client'].status !== 'stopped' && (
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

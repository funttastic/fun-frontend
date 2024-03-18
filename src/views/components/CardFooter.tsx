import { Switcher } from '@/components/ui'
import {
    apiPostServiceStart,
    apiPostServiceStop,
} from '@/model/service/api/funttastic'
import { Status } from '@/model/enum/status'
import { connect } from 'react-redux'
import {dispatch as funttasticDispatch} from "@/model/state/redux/store";

const mapStateToProps = (state, props) => ({
    status: state.app.api.funttastic.client.status,
})

const mapDispatchToProps = (dispatch, props) => ({
    toggleStartStop: () => {
        return async () => {
            dispatch(async (dispatch, getState) => {
                const status = getState().app.api.funttastic.client.status

                if (
                    [Status.stopped.id, Status.unknown.id].includes(
                        status[props.target],
                    )
                ) {
                    status[props.target] = Status.unknown.id
                    funttasticDispatch('api.funttastic.client.updateStatus', status)

                    await apiPostServiceStart({ id: props.target })
                } else {
                    status[props.target] = Status.unknown.id
                    funttasticDispatch('api.funttastic.client.updateStatus', status)

                    await apiPostServiceStop({ id: props.target })
                }
            })
        }
    },
})

const CardFooterStructure = (props) => {
    const status = Status.getById(props.status[props.target])

    const enabled =
        status
        && [
            Status.stopped,
            // Status.starting,
            Status.idle,
            Status.running,
            // Status.stopping,
            // Status.unknown,
        ].includes(status)

    const checked =
        status
        && [
            // Status.stopped,
            Status.starting,
            Status.idle,
            Status.running,
            // Status.stopping,
            // Status.unknown,
        ].includes(status)

    return (
        <div className="flex">
            {enabled ? (
                <Switcher
                    checked={checked}
                    color="green-500"
                    onChange={
                        props.toggleStartStop &&
                        props.toggleStartStop(props.target)
                }
                />
            ) : (
                <Switcher disabled={!enabled} />
            )}
        </div>
    )
}

const CardFooter = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardFooterStructure)

export default CardFooter

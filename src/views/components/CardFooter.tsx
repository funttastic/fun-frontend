import { Switcher } from '@/components/ui'
import { apiPostServiceStart, apiPostServiceStop } from '@/mock/service'
import { Status } from '@/model/enum/status'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => ({
    status: state.app.api.funttastic.client.status,
})

const mapDispatchToProps = (dispatch, props) => ({
    toggleStartStop: () => {
        return async () => {
            dispatch(async (dispatch, getState) => {
                const status = getState().app.api.funttastic.client.status

                if (status[props.target].status === Status.stopped.id) {
                    await apiPostServiceStart({ target: props.target })
                } else {
                    await apiPostServiceStop({ target: props.target })
                }
            })
        }
    },
})

const CardFooterStructure = (props) => (
    <div className="flex">
        <Switcher
            checkedContent=""
            color="green-500"
            onChange={
                props.toggleStartStop && props.toggleStartStop(props.target)
            }
        />
    </div>
)

const CardFooter = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardFooterStructure)

export default CardFooter

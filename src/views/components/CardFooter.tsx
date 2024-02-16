import { Switcher } from '@/components/ui'
import { apiPostStart, apiPostStop } from '@/mock/service'
import { Status } from '@/model/enum/status'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => ({
    status: state.app.api.funttastic.client.status,
})

const mapDispatchToProps = (dispatch, props) => ({
    apiPostStart(event) {
        return async () => {
            if (props.status[props.target].status === Status.stopped) {
                await apiPostStart({ target: props.target })
            } else {
                await apiPostStop({ target: props.target })
            }
        }
    },
})

const CardFooter = (props) => (
    <div className="flex">
        <Switcher
            checkedContent=""
            color="green-500"
            onChange={props.apiPostStart && props.apiPostStart('fun-client')}
        />
    </div>
)

const cardFooterBehavior = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardFooter)

export default cardFooterBehavior

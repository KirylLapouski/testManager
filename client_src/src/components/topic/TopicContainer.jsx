import React from 'react'
import Topic from './Topic'
import { connect } from 'react-redux'
import { addQuestionIdToTopic } from '../../redux/AC/topic'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
//TODO: error handling does not work
class TopicContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasTests: false
        }
    }
    componentDidMount() {
        this.props.getTopicQuestion(this.props.id)
            .then(value => {
                if (value.length) this.setState({ hasTests: true })
            })
    }

    render() {
        return <Topic {...this.props} {...this.state} />
    }
}
TopicContainer.propTypes = {
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    ownerId: PropTypes.number,
    //redux
    getTopicQuestion: PropTypes.func,
}

const mapDispatchToProps = dispatch => {
    return {
        getTopicQuestion(topicId) {
            return dispatch(addQuestionIdToTopic(topicId))
        }
    }
}
export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(TopicContainer)
)

import React from 'react'
import Topic from './Topic'
import { connect } from 'react-redux'
import { addQuestionIdToTopic } from '../../redux/AC/topic'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
//TODO: error handling does not work
class TopicContainer extends React.Component {
    componentDidMount() {
        this.props.getTopicQuestion(this.props.id)
    }

    render() {
        return <Topic {...this.props} />
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
const mapStateToProps = (state, ownProps) => {
    return {
        hasTests: (ownProps.hasTests === false) ? ownProps.hasTests : (
            state.topics[ownProps.id] &&
            state.topics[ownProps.id].questions &&
            !!state.topics[ownProps.id].questions.length)
    }
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
        mapStateToProps,
        mapDispatchToProps
    )(TopicContainer)
)

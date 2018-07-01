import React from 'react'
import Test from '../Test'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addQuestionIdToTopic } from '../../redux/AC/topic'
import MyEditor from '../editor/index'
class Topic extends React.Component {

    componentWillMount() {
        this.props.getTopicQuestion(this.props.id)
    }

    render() {
        return <div style={{ color: 'black', width: '80%', margin: '30px auto' }}>
            {/* {(this.props.type === 'video' || this.props.type === 'audio') && <Media src={this.props.path} />} */}
            <MyEditor topicId={this.props.id} currentData={this.props.path} readOnly={this.props.readOnly} />
            {this.props.hasTests && <Test key={this.props.id}  topicId={this.props.id} />}
        </div>
    }
}

Topic.propTypes = {
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    //redux
    getTopicQuestion: PropTypes.func,
    hasTests: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    return {
        hasTests: (state.topics[ownProps.id].questions && state.topics[ownProps.id].questions.length) ? true : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTopicQuestion(topicId) {
            dispatch(addQuestionIdToTopic(topicId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic)

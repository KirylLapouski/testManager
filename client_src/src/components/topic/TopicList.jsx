import React from 'react'
import Paginator from '../Paginator'
import Topic from './Topic'
import PropTypes from 'prop-types'
import EditButton from '../EditButton'
//TODO: can rewrite on function
class TopicContainer extends React.Component {
    render() {
        var {loggedUserId,userOwnerId} =this.props
        var paginatorSerialNumber
        if ((JSON.stringify(this.props.topics) !== '[]')) {
            for (var i = 0; i < this.props.topics.length; i++) {
                if (Number(this.props.currenTopicId) === this.props.topics[i].id) {
                    var topic = this.props.topics[i]
                    paginatorSerialNumber = i + 1
                }
            }
            var elem = <Topic key={this.props.match.params.topicId} readOnly={this.props.readOnly} path={topic.path} id={topic.id} />
        }
        return (<div>
            {this.props.topics.length && <Paginator initCurrentPos={paginatorSerialNumber || null} length={this.props.topics.length} onClick={this.props.handlePaginatorClick} />}
            {elem}
            {loggedUserId === userOwnerId && <EditButton onTopicEditClick={this.props.readOnly ? this.props.handleTopicBeginEditClick : this.props.handleTopicEndEditClick} />}
        </div>
        )
    }
}

TopicContainer.propTypes = {
    topics: PropTypes.arrayOf({
        id: PropTypes.number,
        path: PropTypes.string,
    }),
    loggedUserId: PropTypes.number,
    userOwnerId: PropTypes.number,
    currenTopicId: PropTypes.number,
    rightAnswersWeight: PropTypes.number,
    allAnswersWeight: PropTypes.number,
    readOnly: PropTypes.bool,
    handlePaginatorClick: PropTypes.func,
    handleTopicEndEditClick: PropTypes.func,
    handleTopicBeginEditClick: PropTypes.func
}
export default TopicContainer

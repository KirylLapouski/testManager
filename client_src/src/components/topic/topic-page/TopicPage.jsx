import React from 'react'
import Paginator from '../../Paginator'
import TopicContainer from '../TopicContainer'
import PropTypes from 'prop-types'
import EditButton from '../../EditButton'
import LessonResultContainer from "../lesson-result/LessonResultContainer";
//TODO: can rewrite on function
class TopicList extends React.Component {
    render() {
        var { loggedUserId, userOwnerId, currenTopicId, topics, allAnswersWeight } = this.props
        var paginatorSerialNumber
        if ((JSON.stringify(topics) !== '[]')) {
            //TODO:instead of receive currentTopicId just take current paginator position
            for (var i = 0; i < topics.length; i++) {
                if (Number(currenTopicId) === topics[i].id) {
                    var topic = topics[i]
                    paginatorSerialNumber = i + 1
                }
            }

            var elem
            if (currenTopicId === 0 && allAnswersWeight) {
                elem = <LessonResultContainer />
            } else {
                elem = <TopicContainer key={this.props.match.params.topicId} readOnly={this.props.readOnly} path={topic && topic.path} id={topic && topic.id} />
            }
        }

        return (<div>
            {topics.length + 1 && <Paginator initCurrentPos={paginatorSerialNumber || null} length={topics.length + !!allAnswersWeight} onClick={this.props.handlePaginatorClick} />}
            {elem}
            {loggedUserId === userOwnerId && <EditButton onTopicEditClick={this.props.readOnly ? this.props.handleTopicBeginEditClick : this.props.handleTopicEndEditClick} />}
        </div>
        )
    }
}

TopicList.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        path: PropTypes.string,
    })),
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
export default TopicList

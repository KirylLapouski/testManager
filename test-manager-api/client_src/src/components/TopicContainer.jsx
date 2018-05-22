import React from 'react'
import axios from 'axios'
import Paginator from './Paginator'
import Topic from './Topic'
import toastr from 'toastr'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTopics } from '../redux/AC/topic'
import {Link} from 'react-router-dom'
import EditButton from './EditButton'
class TopicContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currenTopicId: this.props.match.params.topicId ? this.props.match.params.topicId : 1,
            rightAnswersWeight: 0,
            allAnswersWeight: 0
        }

        this.handlePaginatorClick = this.handlePaginatorClick.bind(this)
        this.handleTestSubmit = this.handleTestSubmit.bind(this)
    }

    handlePaginatorClick(i) {
        this.setState({
            currenTopicId: this.props.topics[i-1].id
        })
        //TODO: right redirect?
        window.history.pushState(null, null, '/lesson/' + this.props.match.params.lessonId + '/topic/' + this.props.topics[i - 1].id)
    }

    handleTestSubmit(rightAnswersWeight, allAnswersWeight) {
        return () => {
            toastr.info('Test result: ' + rightAnswersWeight * 100 / allAnswersWeight + '%')
            this.setState(prevState => {
                return {
                    rightAnswersWeight: prevState.rightAnswersWeight + rightAnswersWeight,
                    allAnswersWeight: prevState.allAnswersWeight + allAnswersWeight
                }
            })
        }
    }
    componentWillMount() {
        this.props.getTopics(this.props.match.params.lessonId)
    }

    render() {
        if ((JSON.stringify(this.props.topics) !== '[]')) {
            for(var i=0;i<this.props.topics.length;i++){
                if(Number(this.state.currenTopicId)===this.props.topics[i].id){
                    var topic =  this.props.topics[i]
                }
            }
            var elem = <Topic key={this.props.match.params.topicId} handleTestSubmit={this.handleTestSubmit} path={topic.path} id={topic.id} />
        }

       
        return (<div>
            <Paginator initCurrentPos={Number(this.props.match.params.topicId) ? Number(this.props.match.params.topicId) : null} length={this.props.topics.length} onClick={this.handlePaginatorClick} />
            {elem}
            {/* <Link to={`${this.props.location.pathname}/testEditor`}> */}
            <EditButton/>
            {/* </Link> */}
        </div>
        )
    }
}

TopicContainer.propTypes = {
    topics: PropTypes.arrayOf({
        id: PropTypes.number,
        path: PropTypes.string,
    }),
    getTopics: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.topics) {
        if (Number(ownProps.match.params.lessonId) === state.topics[key].lessonId) {
            res.push(state.topics[key])
        }
    }
    return { topics: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            dispatch(loadTopics(lessonID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicContainer)
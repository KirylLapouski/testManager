import React from 'react'
import axios from 'axios'
import Paginator from './Paginator'
import Topic from './Topic'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadTopics } from '../redux/AC/topic'
import {Link} from 'react-router-dom'
import EditButton from './EditButton'
import {withRouter} from 'react-router-dom'
class TopicContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currenTopicId: this.props.match.params.topicId ? this.props.match.params.topicId : 1,
            rightAnswersWeight: 0,
            allAnswersWeight: 0,
            readOnly:true
        }

        this.handlePaginatorClick = this.handlePaginatorClick.bind(this)
    }

    handleTopicBeginEditClick = () => {
        this.setState({
            readOnly: false
        })
    }

    handleTopicEndEditClick = () => {
        this.setState({
            readOnly: true
        })
    }

    handlePaginatorClick(i) {
        this.setState({
            currenTopicId: this.props.topics[i-1].id
        })
        //TODO: right redirect?
        this.props.history.push(`/lesson/${this.props.match.params.lessonId}/topic/${this.props.topics[i - 1].id}`)
    }

    componentWillMount() {
        this.props.getTopics(this.props.match.params.lessonId)
    }

    render() {
        var paginatorSerialNumber
        if ((JSON.stringify(this.props.topics) !== '[]')) {
            for(var i=0;i<this.props.topics.length;i++){
                if(Number(this.state.currenTopicId)===this.props.topics[i].id){
                    var topic =  this.props.topics[i]
                    paginatorSerialNumber = i+1 
                }
            }
            var elem = <Topic key={this.props.match.params.topicId} readOnly={this.state.readOnly} path={topic.path} id={topic.id} />
        }
        return (<div>
            {this.props.topics.length && <Paginator initCurrentPos={paginatorSerialNumber || null} length={this.props.topics.length} onClick={this.handlePaginatorClick} />}
            {elem}
            <EditButton onTopicEditClick={this.state.readOnly?this.handleTopicBeginEditClick:this.handleTopicEndEditClick}/>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopicContainer))
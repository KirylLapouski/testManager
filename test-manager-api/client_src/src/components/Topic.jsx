import React from 'react'
import Test from './Test'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { addQuestionIdToTopic } from '../redux/AC/topic'
import Media from './topicContent/Media'
import MyEditor from './slateJs/index'
class Topic extends React.Component {

    componentWillMount() {
        // axios.get("http://localhost:3000/api/Topics/" + this.props.id + "/questions")
        //     .then(response=>{
        //         if(response.data.length){
        //             this.setState(()=>{
        //                 hasTests:true
        //             })
        //         }
        //     })
        this.props.getTopicQuestion(this.props.id)
    }
    render() {
        return <div style={{ color: 'black', width: '80%',margin:'0 auto' }}>
            {(this.props.type === 'video' || this.props.type === 'audio') && <Media src={this.props.path} />}
            <MyEditor />
            {this.props.hasTests && <Test key={this.props.id} onTestSubmit={this.props.handleTestSubmit} topicId={this.props.id} />}
        </div>
    }
}

Topic.propTypes = {
    handleTestSubmit: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['video', 'audio', 'image', 'text']),
    path: PropTypes.string.isRequired,
    getTopicQuestion: PropTypes.func,
    hasTests: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
    return {
        hasTests: state.topics[ownProps.id].questions ? true : false
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
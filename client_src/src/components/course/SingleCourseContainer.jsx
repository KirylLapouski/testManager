import React from 'react'
import {connect} from 'react-redux'
import EditableCourse from './EditableCourse'
import {getCourseOwner, updateCourse} from '../../redux/AC/courses'
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";
class SingleCourseContainer extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            topicModalOpened: false,
            backgroundModalOpened:false
        }
    }

    componentDidMount(){
        this.props.getCourseOwner(this.props.match.params.courseId)
    }

    hanleOpenModal = (name)=>()=>{
        this.setState({
            [name]:true
        })
    }

    handleModalClose =(name)=> ()=>{
        this.setState({
            [name]:false
        })
    }
    render(){
        return <EditableCourse
                    handleTopicModalClose={this.handleModalClose('topicModalOpened')}
                    handleTopicModalOpen={this.hanleOpenModal('topicModalOpened')}
                    handleBackgroundModalClose={this.handleModalClose('backgroundModalOpened')}
                    handleBackgroundModalOpen={this.hanleOpenModal('backgroundModalOpened')}
                    {...this.props}
                    {...this.state}/>
    }
}


const mapStateToProps = (state, ownProps) =>{
    return {
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
        ownerUser: state.users[state.courses[ownProps.match.params.courseId].ownerId],
        course: state.courses[ownProps.match.params.courseId]
    }
}

const mapDispatchToProps = (dispatch,ownProps)=>{
    return{
        getCourseOwner(courseId){
            dispatch(getCourseOwner(courseId))
        },
        updateCourse(courseId, course){
            dispatch(updateCourse(courseId, course))
        }
    }
}

SingleCourseContainer.propTypes = {
    ownerUser: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string
    }),
    course: PropTypes.shape({
        title: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string,
        secretWord: PropTypes.string,
        backgroundUrl: PropTypes.string
    }),
    loggedUserId: PropTypes.number,
    getCourseOwner: PropTypes.func,
    updateCourse: PropTypes.func

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SingleCourseContainer))

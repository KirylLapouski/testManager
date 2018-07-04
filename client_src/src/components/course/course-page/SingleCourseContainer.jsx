import React from 'react'
import {connect} from 'react-redux'
import EditableCourse from './EditableCourse'
import {getCourseOwner, updateCourse} from '../../../redux/AC/courses'
import {withRouter} from 'react-router-dom'
import PropTypes from "prop-types";
class SingleCourseContainer extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            lessonModalOpened: false,
            backgroundModalOpened:false,
            backgroundUrl: ''
        }
    }

    handleSubmitNewBackground = (e)=>{
        e.preventDefault()
        this.props.updateCourse(this.props.match.params.courseId,{backgroundUrl:this.state.backgroundUrl})
        this.handleChange('backgroundModalOpened')(false)(e)
    }


    componentDidMount(){
        this.props.getCourseOwner(this.props.match.params.courseId)
    }

    handleChange = (name)=>(value)=>(e)=>{
        this.setState({
            [name]:e.target.value || value
        })
    }

    render(){
        return <EditableCourse
                    handleTopicModalClose={this.handleChange('lessonModalOpened')(false)}
                    handleTopicModalOpen={this.handleChange('lessonModalOpened')(true)}
                    handleBackgroundModalClose={this.handleChange('backgroundModalOpened')(false)}
                    handleBackgroundModalOpen={this.handleChange('backgroundModalOpened')(true)}
                    handleChange={this.handleChange('backgroundUrl')()}
                    handleSubmitNewBackground={this.handleSubmitNewBackground}
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

const mapDispatchToProps = (dispatch)=>{
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

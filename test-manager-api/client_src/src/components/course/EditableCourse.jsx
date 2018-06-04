import React from 'react';
import CourseHeader from './CourseHeader';
import { withStyles } from 'material-ui/styles';
import UserInfo from '../UserInfo';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import CourseModal from './CourseModal';
import LessonContainer from '../LessonContainer';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {getCourseOwner} from '../../redux/AC/courses'
//TODO: rewrite modals on childs
class EditableCourse extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props)
        this.state = {
            modalOpened: false
        }
    }

    componentDidMount(){
        this.props.getCourseOwner(this.props.match.params.courseId)
    }
    toggleModal = () => {
        this.setState((prevState)=>{
            return {
                modalOpened:!prevState.modalOpened
            }
        })
    }


    handleModalClose = ()=>{
        this.setState({
            modalOpened:false
        })
    }
    render() {
        var {loggedUserId,ownerUser,course} = this.props
        return <div>
            <CourseHeader secretWord={loggedUserId === ownerUser.id && course.secretWord} backgroundSrc='https://lh6.googleusercontent.com/-691E4HHlPjM/VN0ohuHpXiI/AAAAAAAAASM/OsvrdNM5yZw/w984-h209-no/06_bubbles.jpg' name={this.props.course.title} teacherName={this.props.ownerUser && this.props.ownerUser.firstName} teacherLastName={this.props.ownerUser && this.props.ownerUser.secondName}>
                <UserInfo disabled={true} userId={this.props.ownerUser && this.props.ownerUser.id}/>
            </CourseHeader>

            {loggedUserId === ownerUser.id && <Button onClick={this.toggleModal} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex:'2' }}>
                <AddIcon />
            </Button>}
            {/* TODO: How to deliver route to child? */}
            <LessonContainer lessonsOwner={this.props.ownerUser} loggedUserId={this.props.loggedUserId} courseId={this.props.match.params.courseId}/>
            <CourseModal open={this.state.modalOpened} courseId={this.props.match.params.courseId} handleClose={this.handleModalClose}/>
        </div>
    }
}

EditableCourse.propTypes = {
    //redux
    ownerUser: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string
    }),
    course: PropTypes.shape({
        title: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string,
        secretWord: PropTypes.string
    }),
    getCourseOwner: PropTypes.func,
    loggedUserId: PropTypes.number,
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
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditableCourse))
import React from 'react'
import CourseHeader from './CourseHeader'
import UserInfo from '../UserInfo'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import CourseModal from './CourseModal'
import LessonContainer from '../LessonContainer'
import PropTypes from 'prop-types'
//TODO: rewrite modals on childs
//TODO: can rewrite on function
class EditableCourse extends React.Component {
    render() {
        var {loggedUserId,ownerUser,course,toggleModal, modalOpened,handleModalClose} = this.props
        return <div>
            <CourseHeader secretWord={loggedUserId === ownerUser.id && course.secretWord} backgroundSrc='https://lh6.googleusercontent.com/-691E4HHlPjM/VN0ohuHpXiI/AAAAAAAAASM/OsvrdNM5yZw/w984-h209-no/06_bubbles.jpg' updateCourse={this.props.updateCourse.bind(null,this.props.course.id)} name={this.props.course.title} teacherName={this.props.ownerUser && this.props.ownerUser.firstName} teacherLastName={this.props.ownerUser && this.props.ownerUser.secondName}>
                <UserInfo disabled={true} userId={this.props.ownerUser && this.props.ownerUser.id}/>
            </CourseHeader>

            {loggedUserId === ownerUser.id && <Button onClick={toggleModal} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex:'2' }}>
                <AddIcon />
            </Button>}
            <LessonContainer lessonsOwner={ownerUser} loggedUserId={loggedUserId} courseId={this.props.match.params.courseId}/>
            <CourseModal open={modalOpened} courseId={this.props.match.params.courseId} handleClose={handleModalClose}/>
        </div>
    }
}

EditableCourse.propTypes = {
    ownerUser: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string
    }),
    course: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        firstName: PropTypes.string,
        secondName: PropTypes.string,
        secretWord: PropTypes.string
    }),
    loggedUserId: PropTypes.number,
    modalOpened: PropTypes.bool,
    toggleModal: PropTypes.func,
    handleModalClose: PropTypes.func,
    updateCourse: PropTypes.func
}
export default EditableCourse

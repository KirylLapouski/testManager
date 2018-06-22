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
        var {loggedUserId,ownerUser,course,toggleModal, topicModalOpened,handleTopicModalClose,handleBackgroundModalClose,backgroundModalOpened,handleBackgroundModalOpen} = this.props
        return <div>
            <CourseHeader backgroundModalOpened={backgroundModalOpened}
                handleBackgroundModalOpen={handleBackgroundModalOpen}
                handleBackgroundModalClose={handleBackgroundModalClose}
                secretWord={loggedUserId === ownerUser.id && course.secretWord}
                backgroundSrc={course.backgroundUrl}
                updateCourse={this.props.updateCourse.bind(null,course.id)}
                name={this.props.course.title} teacherName={this.props.ownerUser && this.props.ownerUser.firstName}
                teacherLastName={this.props.ownerUser && this.props.ownerUser.secondName}>
                <UserInfo disabled={true} userId={this.props.ownerUser && this.props.ownerUser.id}/>
            </CourseHeader>

            {loggedUserId === ownerUser.id && <Button onClick={toggleModal} variant="fab" color="primary" aria-label="add" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex:'2' }}>
                <AddIcon />
            </Button>}
            <LessonContainer lessonsOwner={ownerUser} loggedUserId={loggedUserId} courseId={this.props.match.params.courseId}/>
            <CourseModal open={topicModalOpened} courseId={this.props.match.params.courseId} handleClose={handleTopicModalClose}/>
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
        secretWord: PropTypes.string,
        backgroundUrl: PropTypes.string
    }),
    loggedUserId: PropTypes.number,
    topicModalOpened: PropTypes.bool,
    backgroundModalOpened: PropTypes.bool,
    toggleModal: PropTypes.func,
    handleTopicModalClose: PropTypes.func,
    handleBackgroundModalClose: PropTypes.func,
    handleBackgroundModalOpen: PropTypes.func,
    updateCourse: PropTypes.func
}
export default EditableCourse

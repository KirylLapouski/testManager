import React from 'react'
import LessonContainer from '../../lesson/LessonList'
import PropTypes from 'prop-types'
import SideBar from "./SideBar";
class CourseMain extends React.Component {
    render() {
        var { ownerUser, loggedUserId, courseId } = this.props
        return <div style={{ position: 'relative' }}>
            {loggedUserId === ownerUser.id && <SideBar style={{ position: 'absolute', top: '2%', left: '2%', width: '15%' }} />}
            < LessonContainer lessonsOwner={ownerUser} loggedUserId={loggedUserId} courseId={courseId} />
        </div >
    }
}

CourseMain.propTypes = {
    ownerUser: PropTypes.object,
    courseId: PropTypes.number,
    loggedUserId: PropTypes.number
}
export default CourseMain

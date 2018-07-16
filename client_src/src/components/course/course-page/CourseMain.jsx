import React from 'react'
import LessonContainer from '../../lesson/LessonList'
import PropTypes from 'prop-types'
import SideBar from "./SideBar";
import UserListContainer from "../../user/UserListContainer";
class CourseMain extends React.Component {

    constructor() {
        super()

        this.CONTENT = ['Lessons', 'Students']
        this.state = {
            contentDisplay: this.CONTENT[0]
        }
    }

    sideBarClickHandler = (i) => () => {
        this.setState({
            contentDisplay: this.CONTENT[i]
        })
    }

    render() {
        var { ownerUser, loggedUserId, courseId } = this.props
        var { contentDisplay } = this.state

        return <div style={{ position: 'relative' }}>
            <SideBar lessonButtonOnClick={this.sideBarClickHandler(0)} descipleButtonClick={this.sideBarClickHandler(1)} style={{ position: 'absolute', top: '20px', left: '2%', width: '15%' }} />
            {contentDisplay === this.CONTENT[0] ? < LessonContainer lessonsOwner={ownerUser} loggedUserId={loggedUserId} courseId={courseId} /> : <UserListContainer courseId={courseId} />}
        </div >
    }
}

CourseMain.propTypes = {
    ownerUser: PropTypes.object,
    courseId: PropTypes.number,
    loggedUserId: PropTypes.number
}
export default CourseMain

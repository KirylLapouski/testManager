import React from 'react'
import LessonContainer from '../../lesson/LessonList'
import PropTypes from 'prop-types'
import SideBar from "./SideBar";
import UserListContainer from "../../user/UserListContainer";
import CourseResultContainer from "./CourseResultContainer";

class CourseMain extends React.Component {

    constructor() {
        super()

        this.CONTENT = ['Lessons', 'Students']
        this.state = {
            contentDisplay: this.CONTENT[0],
            showChartFor: 0

        }
    }

    sideBarClickHandler = (i) => () => {
        this.setState({
            contentDisplay: this.CONTENT[i]
        })
    }

    toggleShowChartClick = (userId) => () => {
        this.setState({
            showChartFor: userId
        })
    }

    render() {
        var { ownerUser, loggedUserId, courseId } = this.props
        var { contentDisplay, showChartFor } = this.state

        return <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
            <SideBar lessonButtonOnClick={this.sideBarClickHandler(0)} descipleButtonClick={this.sideBarClickHandler(1)} style={{ width: '200px', marginTop: '50px', maxHeight: '300px' }} />
            <div style={{ width: '1200px', display: 'flex', justifyContent: 'center' }}>
                {contentDisplay === this.CONTENT[0] ? < LessonContainer lessonsOwner={ownerUser} loggedUserId={loggedUserId} courseId={courseId} /> : <UserListContainer toggleShowChartClick={this.toggleShowChartClick} courseId={courseId} />}
            </div>
            {showChartFor && <CourseResultContainer userId={showChartFor} />}
        </div >
    }
}

CourseMain.propTypes = {
    ownerUser: PropTypes.object,
    courseId: PropTypes.number,
    loggedUserId: PropTypes.number
}
export default CourseMain

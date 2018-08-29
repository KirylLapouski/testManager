import React from "react";
import LessonListContainer from "../../lesson/lesson-list/LessonListContainer";
import PropTypes from "prop-types";
import SideBar from "./SideBar";
import UserListContainer from "../../user/user-list/UserListContainer";
import CourseResultContainer from "./course-result/CourseResultContainer";
import CourseResultChart from './course-result/CourseResultChart'
import { withStyles } from "@material-ui/core/styles";
const CONTENT_TYPE = ["Lessons", "Students"];

const styles = {
    courseMain: { position: "relative", display: "flex", alignItems: "flex-start" },
        contentContainer: { width: "1200px", display: "flex", justifyContent: "center" }
}
class CourseMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentDisplay: CONTENT_TYPE[0],
            showCourseResultChartForUser: 0
        };
    }

    sideBarClickHandler = i => () => {
        this.setState({
            contentDisplay: CONTENT_TYPE[i]
        });
    };

    toggleShowChartClick = userId => () => {
        this.setState({
            showCourseResultChartForUser: userId
        });
    };

    render() {
        let { ownerUser, loggedUserId, courseId, classes } = this.props;
        let { contentDisplay, showCourseResultChartForUser } = this.state;

        return (
            <div className={classes.courseMain}>
                <SideBar lessonButtonOnClick={this.sideBarClickHandler(0)} descipleButtonClick={this.sideBarClickHandler(1)} style={{ width: "200px", marginTop: "50px", marginLeft: "10px", maxHeight: "300px" }} />
                <div className={classes.contentContainer} >
                    {contentDisplay === CONTENT_TYPE[0] ? (
                        <LessonListContainer lessonsOwner={ownerUser} loggedUserId={loggedUserId} courseId={courseId} />
                    ) : (
                            <UserListContainer toggleShowChartClick={this.toggleShowChartClick} courseId={courseId} />
                        )}
                </div>
                {contentDisplay !== CONTENT_TYPE[0] &&
                    showCourseResultChartForUser && (
                        <CourseResultContainer userId={showCourseResultChartForUser}>
                            <CourseResultChart />
                        </CourseResultContainer>
                    )}
            </div>
        );
    }
}

CourseMain.propTypes = {
    ownerUser: PropTypes.object,
    courseId: PropTypes.number,
    loggedUserId: PropTypes.number
};
export default withStyles(styles)(CourseMain);

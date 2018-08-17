import React from "react";
import LessonListContainer from "../../lesson/lesson-list/LessonListContainer";
import PropTypes from "prop-types";
import SideBar from "./SideBar";
import UserListContainer from "../../user/user-list/UserListContainer";
import CourseResultContainer from "./course-result/CourseResultContainer";
import CourseResultChart from './course-result/CourseResultChart'
const CONTENT_TYPE = ["Lessons", "Students"];
class CourseMain extends React.Component {
    constructor() {
        super();

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
        let { ownerUser, loggedUserId, courseId } = this.props;
        let { contentDisplay, showCourseResultChartForUser } = this.state;

        return (
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start"
                }}
            >
                <SideBar
                    lessonButtonOnClick={this.sideBarClickHandler(0)}
                    descipleButtonClick={this.sideBarClickHandler(1)}
                    style={{
                        width: "200px",
                        marginTop: "50px",
                        marginLeft: "10px",
                        maxHeight: "300px"
                    }}
                />
                <div
                    style={{
                        width: "1200px",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    {contentDisplay === CONTENT_TYPE[0] ? (
                        <LessonListContainer
                            lessonsOwner={ownerUser}
                            loggedUserId={loggedUserId}
                            courseId={courseId}
                        />
                    ) : (
                            <UserListContainer
                                toggleShowChartClick={this.toggleShowChartClick}
                                courseId={courseId}
                            />
                        )}
                </div>
                {contentDisplay !== CONTENT_TYPE[0] &&
                    showCourseResultChartForUser && (
                        <CourseResultContainer
                            userId={showCourseResultChartForUser}
                        >
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
export default CourseMain;

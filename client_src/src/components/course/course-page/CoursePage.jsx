import React from "react";
import CourseHeader from "./CourseHeader";
import UserInfoContainer from "../../user/user-info/UserInfoContainer";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import NewLessonModal from "../../modal/modal-total/NewLessonModal";
import CourseMain from "./CourseMain";

import PropTypes from "prop-types";
//TODO: rewrite modals on childs
//TODO: can rewrite on function
class CoursePage extends React.Component {
    render() {
        var {
            loggedUserId,
            ownerUser,
            course,
            lessonModalOpened,
            backgroundModalOpened,
            handleTopicModalOpen,
            handleTopicModalClose,
            handleBackgroundModalClose,
            handleBackgroundModalOpen,
            handleSubmitNewBackground,
            handleChange
        } = this.props;
        return (
            <div style={{ position: "relative" }}>
                <CourseHeader
                    backgroundModalOpened={backgroundModalOpened}
                    handleBackgroundModalOpen={handleBackgroundModalOpen}
                    handleBackgroundModalClose={handleBackgroundModalClose}
                    secretWord={
                        loggedUserId === ownerUser && ownerUser.id
                            ? course.secretWord
                            : ""
                    }
                    backgroundSrc={course.backgroundUrl}
                    name={course.title}
                    teacherName={ownerUser && ownerUser.firstName}
                    teacherLastName={ownerUser && ownerUser.secondName}
                    handleSubmitNewBackground={handleSubmitNewBackground}
                    handleChange={handleChange}
                >
                    <UserInfoContainer
                        disabled={true}
                        userId={ownerUser && ownerUser.id}
                    />
                </CourseHeader>

                {loggedUserId === ownerUser &&
                    ownerUser.id && (
                        <Button
                            onClick={handleTopicModalOpen}
                            variant="fab"
                            color="primary"
                            aria-label="add"
                            style={{
                                position: "fixed",
                                bottom: "20px",
                                right: "20px",
                                zIndex: "2"
                            }}
                        >
                            <AddIcon />
                        </Button>
                    )}
                <CourseMain
                    ownerUser={ownerUser}
                    loggedUserId={loggedUserId}
                    courseId={+this.props.match.params.courseId}
                />
                <NewLessonModal
                    open={lessonModalOpened}
                    courseId={this.props.match.params.courseId}
                    handleClose={handleTopicModalClose}
                />
            </div>
        );
    }
}

CoursePage.propTypes = {
    ownerUser: PropTypes.shape({
        id: PropTypes.number,
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
    lessonModalOpened: PropTypes.bool,
    backgroundModalOpened: PropTypes.bool,
    handleBackgroundModalOpen: PropTypes.func,
    handleBackgroundModalClose: PropTypes.func,
    handleTopicModalOpen: PropTypes.func,
    handleTopicModalClose: PropTypes.func,
    handleSubmitNewBackground: PropTypes.func,
    handleChange: PropTypes.func
};
export default CoursePage;

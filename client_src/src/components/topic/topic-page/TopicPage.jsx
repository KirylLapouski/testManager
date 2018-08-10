import React from "react";
import TopicContainer from "../TopicContainer";
import PropTypes from "prop-types";
import EditButton from "../../EditButton";
import LessonResultContainer from "../lesson-result/LessonResultContainer";
import toastr from "toastr";
import Stepper from "../../stepper/Stepper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Done from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
//TODO: can rewrite on function
class TopicPage extends React.Component {
    // handleBackToLessonsClick = () => {
    //     this.props.history.push('/')
    // };
    handleTopicEditClick = readOnly => {
        return this.props.readOnly
            ? () => {
                  toastr.info("Режим редактирования");
                  this.props.handleTopicBeginEditClick();
              }
            : () => {
                  toastr.info("Режим просмотра");
                  this.props.handleTopicEndEditClick();
              };
    };

    goToLessonClickHandler = () => {
        this.props.history.push(`/${this.props.course.id}/lessons`);
    };
    render() {
        var {
            loggedUserId,
            userOwnerId,
            topics,
            classes,
            handleStep,
            activeStep,
            completed,
            handleReset,
            completedSteps,
            totalSteps,
            handleFinish,
            handleComplete,
            handleBack,
            handleNext,
            readOnly,
            allStepsCompleted,
            handleDeleteTopic
        } = this.props;
        const steps = topics.map(value => {
            return value.title;
        });

        return (
            <React.Fragment>
                {topics.length + 1 && (
                    <Stepper
                        stepsTitles={steps}
                        handleStep={handleStep}
                        activeStep={activeStep}
                        completed={completed}
                    />
                )}
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography className={classes.instructions}>
                            Результаты урока
                        </Typography>
                        <LessonResultContainer />

                        <Button
                            className={classes.resetButton}
                            onClick={handleReset}
                        >
                            Пройти снова
                        </Button>
                        {/* <Button onClick={this.handleBackToLessonsClick}>
                            Назад к урокам
                        </Button> */}
                    </React.Fragment>
                ) : (
                    activeStep !== steps.length &&
                    completed[activeStep] && (
                        <React.Fragment>
                            <Typography
                                variant="caption"
                                className={classes.completed}
                            >
                                Step {activeStep + 1} already completed
                            </Typography>
                        </React.Fragment>
                    )
                )}
                {loggedUserId === userOwnerId && (
                    <EditButton
                        onTopicEditClick={this.handleTopicEditClick(
                            this.props.readOnly
                        )}
                        handleDeleteTopic={handleDeleteTopic}
                    />
                )}
                {!allStepsCompleted() && (
                    <TopicContainer
                        key={this.props.match.params.topicId}
                        readOnly={readOnly}
                        path={topics[activeStep] && topics[activeStep].path}
                        id={topics[activeStep] && topics[activeStep].id}
                        ownerId={userOwnerId}
                    />
                )}
                <div>
                    <Button
                        className={classes.goToLessonsButton}
                        onClick={this.goToLessonClickHandler}
                    >
                        Вернуться к урокам
                    </Button>
                    {activeStep !== steps.length &&
                        !completed[activeStep] && (
                            <Button
                                variant="raised"
                                color="primary"
                                // className={classes}
                                onClick={
                                    completedSteps() === totalSteps() - 1
                                        ? handleFinish
                                        : handleComplete
                                }
                            >
                                <Done />
                                {completedSteps() === totalSteps() - 1
                                    ? "Завершить урок"
                                    : "Завершить топик"}
                            </Button>
                        )}
                </div>
                <Tooltip title="Предыдущий урок" placement="left">
                    <IconButton
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backTopicButton}
                    >
                        <KeyboardArrowLeft className={classes.icon} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Следующий урок" placement="right">
                    <IconButton
                        onClick={handleNext}
                        className={classes.nextTopicButton}
                    >
                        <KeyboardArrowRight className={classes.icon} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }
}

TopicPage.propTypes = {
    topics: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            path: PropTypes.string
        })
    ),
    loggedUserId: PropTypes.number,
    userOwnerId: PropTypes.number,
    readOnly: PropTypes.bool,
    activeStep: PropTypes.number,
    completed: PropTypes.object,
    course: PropTypes.shape({
        id: PropTypes.number
    }),
    handleTopicEndEditClick: PropTypes.func,
    handleTopicBeginEditClick: PropTypes.func,
    handleStep: PropTypes.func,
    handleReset: PropTypes.func,
    completedSteps: PropTypes.func,
    totalSteps: PropTypes.func,
    handleNext: PropTypes.func,
    handleFinish: PropTypes.func,
    handleComplete: PropTypes.func,
    handleBack: PropTypes.func,
    allStepsCompleted: PropTypes.func,
    handleDeleteTopic: PropTypes.func
};

const styles = {
    nextTopicButton: {
        position: "fixed",
        width: "100px",
        height: "100px",
        right: "10px",
        bottom: "45vh"
    },
    icon: {
        width: "100px",
        height: "100px"
    },
    backTopicButton: {
        position: "fixed",
        width: "100px",
        height: "100px",
        left: "10px",
        bottom: "45vh"
    },
    instructions: {
        fontSize: "30px",
        fontWeight: "bold"
    },
    resetButton: {
        width: "200px",
        margin: "50px auto"
    },
    goToLessonsButton: {
        height: "40px",
        marginRight: "20px"
    }
};
export default withRouter(withStyles(styles)(TopicPage));

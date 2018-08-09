import React from "react";
import { connect } from "react-redux";
import TopicPage from "./TopicPage";
import { loadTopics } from "../../../redux/AC/topic";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//TODO: write
class TopicPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readOnly: true,
            activeStep: 0,
            completed: {}
        };
    }

    totalSteps = () => {
        return this.props.topics.length;
    };

    changeActiveStep = step => {};
    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            const steps = this.props.topics.map(value => {
                return value.title;
            });
            activeStep = steps.findIndex(
                (step, i) => !(i in this.state.completed)
            );
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep
        });
        this.goToTopic(activeStep);
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1
        });
        this.goToTopic(activeStep - 1);
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step
        });
        this.goToTopic(step);
    };

    handleComplete = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
            completed
        });
        this.handleNext();
    };

    handleFinish = () => {
        const { completed } = this.state;
        completed[this.state.activeStep] = true;
        this.setState({
            completed
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: {}
        });
        this.goToTopic(0);
    };

    completedSteps = () => {
        return Object.keys(this.state.completed).length;
    };

    isLastStep = () => {
        return this.state.activeStep === this.totalSteps() - 1;
    };

    allStepsCompleted = () => {
        return this.completedSteps() === this.totalSteps();
    };

    handleTopicBeginEditClick = () => {
        this.setState({
            readOnly: false
        });
    };

    handleTopicEndEditClick = () => {
        this.setState({
            readOnly: true
        });
    };

    goToTopic = i => {
        this.props.history.push(
            `/lesson/${this.props.match.params.lessonId}/topic/${
                this.props.topics[i].id
            }`
        );
    };

    componentWillMount() {
        this.props.getTopics(this.props.match.params.lessonId);
    }
    componentDidMount() {
        if (typeof this.props.topics !== "indefined") {
            this.props.topics.forEach((value, index) => {
                if (value.id === +this.props.match.params.topicId) {
                    this.setState({
                        activeStep: index
                    });
                }
            });
        }
    }

    render() {
        return (
            <TopicPage
                handleTopicEndEditClick={this.handleTopicEndEditClick}
                handleTopicBeginEditClick={this.handleTopicBeginEditClick}
                handleStep={this.handleStep}
                handleReset={this.handleReset}
                completedSteps={this.completedSteps}
                totalSteps={this.totalSteps}
                handleNext={this.handleNext}
                handleFinish={this.handleFinish}
                handleComplete={this.handleComplete}
                handleBack={this.handleBack}
                allStepsCompleted={this.allStepsCompleted}
                {...this.props}
                {...this.state}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    var res = [];
    for (var key in state.topics) {
        if (
            Number(ownProps.match.params.lessonId) ===
            state.topics[key].lessonId
        ) {
            res.push(state.topics[key]);
        }
    }
    return {
        topics: res,
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
        userOwnerId:
            state.courses[
                state.lessons[ownProps.match.params.lessonId].disciplineId
            ].ownerId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopics(lessonID) {
            dispatch(loadTopics(lessonID));
        }
    };
};

TopicPageContainer.propTypes = {
    topics: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            path: PropTypes.string
        })
    ),
    loggedUserId: PropTypes.number,
    userOwnerId: PropTypes.number,
    getTopics: PropTypes.func
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TopicPageContainer)
);

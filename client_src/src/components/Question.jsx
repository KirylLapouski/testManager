import React from "react";
import PropTypes from "prop-types";
import AnswerList from "./testCMS/answers/AnswerList";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loadAnswers } from "../redux/AC/answers";
import { submitQuestionResult } from "../redux/AC/users";
import toastr from "toastr";
import DraggableListQuestionSwitcher from './testCMS/answers/draggable-list/DraggableListQuestionSwitcher'
class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choosen: [],
            testType: "checkbox"
        };

        this.renderAnswers = this.renderAnswers.bind(this);
        this.checkCorrectAnswers = this.checkCorrectAnswers.bind(this);
    }

    componentDidMount() {
        this.props.getAnswers(this.props.question.id)
            .then((answers) => {
                switch (answers[0].typeOfAnswer) {
                    case "draggableList":
                        this.setState({ testType: answers[0].typeOfAnswer })
                        break;
                    case "radio":
                    case "checkbox":
                        let numberOfRightAnswers = 0;
                        answers.map(value => {
                            if (value.isRight) numberOfRightAnswers++;
                        });
                        if (numberOfRightAnswers > 1)
                            this.setState({
                                testType: "checkbox"
                            });
                        if (numberOfRightAnswers === 1) {
                            this.setState({
                                testType: "radio"
                            });
                        }
                        break
                }

            })
    }

    checkCorrectAnswers() {
        var answers = this.props.answers;
        var choosen = this.state.choosen;
        if (!choosen.length) {
            toastr.error(
                "Выберите хотя бы один вариант ответа",
                "Ошибка отправки формы"
            );
            return;
        }
        var res = answers.every((answer, i) => {
            if (answer.isRight) {
                if (choosen[i] != true) return false;
            } else {
                if (choosen[i] == true) return false;
            }
            return true;
        });
        if (res) {
            this.props.onRightAnswer(this.props.question.weight);
            this.props.submitAnswer(this.props.loggedInUser.id, true);
        } else {
            this.props.onWrongAnswer();
            this.props.submitAnswer(this.props.loggedInUser.id, false);
        }
    }

    handleAnswerClick = i => e => {
        this.setState(prevState => {
            var res = prevState.choosen;
            res[i] = !res[i];
            return { choosen: res };
        });
    };

    handleRadioClick = i => e => {
        this.setState(prevState => {
            var res = new Array(prevState.choosen.length).fill(false);
            res[i] = true;
            return { choosen: res };
        });
    };
    renderAnswers() {
        console.log(this.props.answers)
        switch (this.state.testType) {
            case "draggableList":
                return (
                    <DraggableListQuestionSwitcher
                        displayMode={'testing'}
                        answers={JSON.parse(this.props.answers[0].text)}
                        deleteListItem={this.deleteListItem}
                        onChange={list =>
                            this.setState(prevState => {
                                return {
                                    draggableList: {
                                        ...prevState.draggableList,
                                        text: [...list]
                                    }
                                };
                            })
                        }
                    />
                );
            case 'radio':
            case "checkbox":
                return <AnswerList
                    typeOfAnswer={this.state.testType}
                    answers={this.props.answers.map((value, i) => {
                        return {
                            ...value,
                            isRight: !!this.state.choosen[i]
                        }
                    })}
                    onClick={
                        this.state.testType === "radio"
                            ? this.handleRadioClick
                            : this.handleAnswerClick
                    }
                />
        }
    }
    render() {
        return (
            <form
                action=""
                style={{
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left"
                }}
            >
                <h3>{this.props.question.title}</h3>
                <p>{this.props.question.description}</p>
                {this.renderAnswers()}
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={this.checkCorrectAnswers}
                >
                    Ответить
                </Button>
            </form>
        );
    }
}

Question.propTypes = {
    onRightAnswer: PropTypes.func.isRequired,
    onWrongAnswer: PropTypes.func,
    question: PropTypes.shape({
        id: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    //redux
    getAnswers: PropTypes.func,
    submitAnswer: PropTypes.func,
    answers: PropTypes.arrayOf(PropTypes.object),
    loggedInUser: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    var res = [];
    for (var key in state.answers) {
        if (
            Number(ownProps.question.id) ===
            Number(state.answers[key].questionId)
        )
            res.push(state.answers[key]);
    }
    return { answers: res, loggedInUser: state.users.loggedIn };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAnswers(questionId) {
            return dispatch(loadAnswers(questionId));
        },
        submitAnswer(userId, isRightAnswered) {
            dispatch(
                submitQuestionResult(
                    userId,
                    ownProps.question.id,
                    isRightAnswered
                )
            );
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Question);

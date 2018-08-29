import React from "react";
import PropTypes from "prop-types";
import AnswerList from "./testCMS/answers/AnswerList";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loadAnswers } from "../redux/AC/answers";
import { submitQuestionResult } from "../redux/AC/users";
import toastr from "toastr";
import DraggableListQuestionSwitcher from './testCMS/answers/draggable-list/DraggableListQuestionSwitcher'
import { shuffle } from '../modules/utils'
class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            choosen: [],
        };
    }

    componentDidMount() {
        this.props.getAnswers(this.props.question.id)
    }

    submitHandle = () => {
        if (this.checkCorrectAnswers()) {
            this.props.onRightAnswer(this.props.question.weight);
            this.props.submitAnswer(this.props.loggedInUser.id, true);
        } else {
            this.props.onWrongAnswer();
            this.props.submitAnswer(this.props.loggedInUser.id, false);
        }
    }
    checkCorrectAnswers = () => {
        switch (this.props.testType) {
            case "radio":
            case "checkbox":
                let answers = this.props.answers;
                let choosen = this.state.choosen;
                if (!choosen.length) {
                    toastr.error(
                        "Выберите хотя бы один вариант ответа",
                        "Ошибка отправки формы"
                    );
                    return;
                }
                return answers.every((answer, i) => {
                    if (answer.isRight) {
                        if (choosen[i] != true) return false;
                    } else {
                        if (choosen[i] == true) return false;
                    }
                    return true;
                });
            case "draggableList":
                console.log(JSON.stringify(this.props.answers))
                console.log(JSON.stringify(this.state.choosen))
                return JSON.stringify(this.props.answers) === JSON.stringify(this.state.choosen) ? true : false
        }

    }

    handleAnswerClick = i => e => {
        this.setState(prevState => {
            let res = prevState.choosen;
            res[i] = !res[i];
            return { choosen: res };
        });
    };

    handleRadioClick = i => e => {
        this.setState(prevState => {
            let res = new Array(prevState.choosen.length).fill(false);
            res[i] = true;
            return { choosen: res };
        });
    };
    renderAnswers = () => {
        switch (this.props.testType) {
            case "draggableList":
                return (
                    <DraggableListQuestionSwitcher
                        displayMode={'testing'}
                        answers={this.state.choosen.length ? this.state.choosen : shuffle(this.props.answers)}
                        deleteListItem={this.deleteListItem}
                        onChange={list =>
                            this.setState({
                                choosen: [...list]
                            })
                        }
                    />
                );
            case 'radio':
            case "checkbox":
                return <AnswerList
                    typeOfAnswer={this.props.testType}
                    answers={this.props.answers.map((value, i) => {
                        return {
                            ...value,
                            isRight: !!this.state.choosen[i]
                        }
                    })}
                    onClick={
                        this.props.testType === "radio"
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
                    onClick={this.submitHandle}
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
    testType: PropTypes.oneOf(['radio', 'checkbox', 'draggableList']),
    getAnswers: PropTypes.func,
    submitAnswer: PropTypes.func,
    answers: PropTypes.arrayOf(PropTypes.object),
    loggedInUser: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    let res = [];
    for (let key in state.answers) {
        if (
            Number(ownProps.question.id) ===
            Number(state.answers[key].questionId)
        )
            res.push(state.answers[key]);
    }
    let typeOfAnswer = res[0] && res[0].typeOfAnswer
    typeOfAnswer = typeOfAnswer || 'radio'
    return {
        answers: typeOfAnswer == 'draggableList' ? JSON.parse(res[0].text) : res,
        testType: typeOfAnswer,
        loggedInUser: state.users.loggedIn
    };
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

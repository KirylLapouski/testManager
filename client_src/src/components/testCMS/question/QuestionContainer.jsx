import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TypeOfAnswerSelect from "../TypeOfAnswerSelect";
import AnswerList from "../answers/AnswerList";
import { connect } from "react-redux";
import {
    loadAnswers,
    deleteAnswer,
    updateOrCreateAnswer
} from "../../../redux/AC/answers";

import { deleteQuestion, updateQuestion } from "../../../redux/AC/question";
import toastr from "toastr";
import DraggableListQuestionSwitcher from "../answers/draggable-list/DraggableListQuestionSwitcher";
import EditableQuestionBottom from "../EditableQuestionBottom";
//TODO: refactor Question cms
class QuestionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionTitle: "",
            // for simple question
            selectedType: "radio",
            answers: [],
            // for list
            draggableList: {}
        };
    }

    componentDidMount() {
        this.props.getAnswers(this.props.question.id);
    }

    handleClickRadio = number => e => {
        var checked = e.target.checked;
        this.setState(prevState => {
            var answers = JSON.parse(JSON.stringify(prevState.answers));
            answers[number].isRight = checked;
            return {
                answers
            };
        });
    };

    handleAnswerTextChange = number => e => {
        var value = e.target.value;
        this.setState(prevState => {
            var newAnswers = [...prevState.answers];
            newAnswers[number].text = value;
            return {
                answers: newAnswers
            };
        });
    };

    componentWillReceiveProps(newProps) {
        if (!this.state.answers.length)
            this.setState({
                answers: newProps.answers
            });
        if (!this.state.draggableList.length && !!newProps.draggableList) {
            this.setState({
                draggableList: {
                    ...newProps.draggableList
                }
            });
        }
    }

    deleteListItem = name => () => {
        this.setState(prevState => {
            var list = prevState.draggableList.text;

            return {
                draggableList: {
                    ...prevState.draggableList,
                    text: list.filter(value => value.name !== name)
                }
            };
        });
    };

    getAnswers = (editable = false) => {
        switch (this.state.selectedType) {
            case "draggableList":
                return (
                    <DraggableListQuestionSwitcher
                        editing={editable}
                        answers={this.state.draggableList.text}
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
            case "radio":
            case "checkbox":
                return (
                    <AnswerList
                        editable={editable}
                        onChange={this.handleAnswerTextChange}
                        typeOfAnswer={this.props.QuestionType}
                        onClick={this.handleClickRadio}
                        answers={this.state.answers}
                        deleteAnswerHandler={this.deleteAnswerHandler}
                    />
                );
        }
    };

    deleteQuestionHandler = () => {
        this.props.deleteQuestion(this.props.question.id);
    };

    deleteAnswerHandler = number => () => {
        this.setState(prevState => {
            var answers = [...prevState.answers];
            answers[number].wouldBeDeletedAfterSubmit = true;
            return {
                answers
            };
        });
    };

    addAnswerHandler = () => {
        this.setState(prevState => {
            var answers = [...prevState.answers];
            answers.push({
                text: ""
            });
            return {
                answers
            };
        });
    };
    begginEdit = () => {
        this.props.toggleOpenItem(this.props.question.id);
    };

    endEdit = () => {
        this.props.toggleOpenItem(-1);
    };

    addItemToDraggableList = () => {
        var hasEmptyItem = this.state.draggableList.text.some(value => {
            return value.name === "";
        });
        if (hasEmptyItem) {
            toastr.error("Исправьте ранее созданный элемент списка");
            return;
        }

        this.setState(prevState => {
            let newList = prevState.draggableList.text;
            newList.push({ name: "" });
            return {
                draggableList: {
                    ...prevState.draggableList,
                    text: newList
                }
            };
        });
    };
    addNewAnswer = () => {
        this.state.selectedType == "draggableList"
            ? this.addItemToDraggableList()
            : this.addAnswerHandler();
    };

    handleSubmit = () => {
        switch (this.state.selectedType) {
            case "draggableList":
                this.handleDraggebleListSubmit();
                break;
            case "radio":
            case "checkbox":
                this.handleRadioCheckBoxSubmit();
                break;
        }
        this.endEdit();
    };

    handleDraggebleListSubmit = () => {
        this.props.updateOrCreateAnswer(
            JSON.stringify(this.state.draggableList.text),
            true,
            this.state.draggableList.questionId,
            "draggableList"
        );
    };

    handleRadioCheckBoxSubmit = () => {
        if (
            !this.state.answers
                .map(answer => answer.text)
                .every(value => value.trim())
        ) {
            toastr.error("Все варианты ответов должны быть заполнены");
            return;
        }

        if (
            !this.state.answers
                .map(answer => answer.isRight)
                .some(value => value)
        ) {
            toastr.error("Надо отметить хотя бы один ответ как правильный");
            return;
        } else {
            toastr.success("Текст ответов сохранён", "Вопрос обновлен");

            this.state.answers.forEach((value, i) => {
                if (value.wouldBeDeletedAfterSubmit) {
                    this.props.deleteAnswer(value.id);
                } else {
                    this.props.updateOrCreateAnswer(
                        value.text,
                        value.isRight,
                        value.id
                    );
                }
            });
        }

        if (this.state.questionTitle) {
            this.props.updateQuestion(
                this.props.question.id,
                this.state.questionTitle
            );
            //TODO: check if updated
            toastr.success("Текст вопроса успешно обновлен", "Вопрос обновлен");
        }
    };
    onChange = name => e => {
        this.setState({
            [name]: e.target.value
        });
    };

    render() {
        var { editing } = this.props;
        var answers = this.getAnswers(editing);
        if (editing) {
            return (
                <div
                    className="mx-auto z-depth-1-half container"
                    style={{
                        borderLeft: "3px solid indigo",
                        color: "#263238",
                        display: "flex",
                        flexDirection: "column",
                        paddingRight: "20px",
                        paddingLeft: "20px"
                    }}
                >
                    <div
                        style={{
                            background: "rgba(0,0,0,0.1)",
                            overflow: "hidden"
                        }}
                    >
                        <h3>{this.props.question.title}</h3>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <TextField
                            label="Вопрос"
                            onChange={this.onChange("questionTitle")}
                            style={{ marginLeft: "27px", width: "50%" }}
                        />
                        <TypeOfAnswerSelect
                            onChange={this.onChange("selectedType")}
                            selectedType={this.state.selectedType}
                            style={{ width: "300px", marginRight: "25px" }}
                        />
                    </div>
                    {answers}
                    <Button onClick={this.addNewAnswer}>
                        Добавить вариант
                    </Button>

                    <EditableQuestionBottom
                        endEditHandler={this.endEdit}
                        handleSubmit={this.handleSubmit}
                        deleteQuestionHandler={this.deleteQuestionHandler}
                    />
                </div>
            );
        } else {
            return (
                <div
                    className="mx-auto container"
                    onClick={this.begginEdit}
                    style={{
                        color: "#263238",
                        borderBottom: "1px  solid rgba(0,0,0,0.12)"
                    }}
                >
                    <div
                        style={{
                            background: "rgba(0,0,0,0.1)",
                            overflow: "hidden"
                        }}
                    >
                        <h3>{this.props.question.title}</h3>
                    </div>
                    {answers}
                </div>
            );
        }
    }
}
//TODO: update right answer in Question cms, display right answer
QuestionContainer.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number,
        topicId: PropTypes.number
    }),
    editing: PropTypes.bool,
    toggleOpenItem: PropTypes.func,
    //redux
    draggableList: PropTypes.shape({}),
    answers: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            //TODO: !!!!!!!!!!!!!!!!! count answer type
            isRight: PropTypes.bool
        })
    ),
    getAnswers: PropTypes.func,
    deleteQuestion: PropTypes.func,
    updateQuestion: PropTypes.func,
    updateOrCreateAnswer: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    var res = [];
    for (var key in state.answers) {
        if (Number(ownProps.question.id) === state.answers[key].questionId) {
            res.push(state.answers[key]);
        }
    }
    var draggable = !!res.filter(
        value => value.typeOfAnswer === "draggableList"
    )[0]
        ? {
              ...res.filter(value => value.typeOfAnswer === "draggableList")[0],
              text: JSON.parse(
                  res.filter(value => value.typeOfAnswer === "draggableList")[0]
                      .text
              )
          }
        : { text: [] };

    return {
        answers: res.filter(
            value =>
                value.typeOfAnswer === "radio" ||
                value.typeOfAnswer === "checkbox"
        ),
        draggableList: draggable
    };
};

const mapDispatchtToProps = (dispatch, ownProps) => {
    return {
        getAnswers(questionId) {
            dispatch(loadAnswers(questionId));
        },
        deleteQuestion(questionId) {
            dispatch(deleteQuestion(questionId));
        },
        updateQuestion(questionId, title) {
            dispatch(updateQuestion(questionId, title));
        },
        deleteAnswer(answerId) {
            dispatch(deleteAnswer(answerId));
        },
        updateOrCreateAnswer(text, isRight, answerId, typeOfAnswer) {
            dispatch(
                updateOrCreateAnswer(
                    text,
                    isRight,
                    ownProps.question.id,
                    answerId,
                    typeOfAnswer
                )
            );
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchtToProps
)(QuestionContainer);

import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { loadQuestion, addQuestion } from "../../../redux/AC/question";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import toastr from "toastr";
import TestPage from "./TestPage";
import {addAnswer} from '../../../redux/AC/answers'
//TODO: decouple adding new question in new component
class TestPageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            weight: 1,
            modalOpened: false
        };
    }
    handleChange = name => event => {
        //TODO: toastr there or in presented comp?
        if (
            name == "weight" &&
            (event.target.value == 1000 || event.target.value == 0)
        ) {
            toastr.warning(
                "Вес вопроса должен находится в интервале от 1 до 1000"
            );
            return;
        }
        this.setState({
            [name]: name === "weight" ? +event.target.value : event.target.value
        });
    };

    openModal = () => {
        this.setState({
            modalOpened: true
        });
    };

    closeModal = () => {
        this.setState({
            modalOpened: false
        });
    };

    handleSubmitNewQuestionForm = e => {
        e.preventDefault();

        let { title, description, weight } = this.state;
        if (!title) {
            toastr.error("Необходимо заполнить поле вопроса");
            return;
        }
        if (weight < 1 || weight > 1000) {
            toastr.error(
                "Вес вопроса должен находится в интервале от 1 до 1000"
            );
            return;
        }
        this.props.addQuestion(
            this.props.match.params.topicId,
            weight,
            title,
            description
        ).then(question => {
            if(question && question.id)   this.props.addAnswer(question.id)
        })
        this.setState({
            title: "",
            description: "",
            weight: 1,
            modalOpened: false
        });
    };

    componentWillMount() {
        this.props.getQuestions(this.props.match.params.topicId);
    }

    render() {
        return (
            <TestPage
                handleChange={this.handleChange}
                openModal={this.openModal}
                closeModal={this.closeModal}
                handleSubmitNewQuestionForm={this.handleSubmitNewQuestionForm}
                {...this.props}
                {...this.state}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let res = [];
    for (let key in state.questions) {
        if (
            Number(ownProps.match.params.topicId) ===
            state.questions[key].topicId
        ) {
            res.push(state.questions[key]);
        }
    }
    return { questions: res };
};

const mapDispatchToProps = dispatch => {
    return {
        getQuestions(topicId) {
            dispatch(loadQuestion(topicId));
        },
        addQuestion(topicId, weight, title, description) {
            return dispatch(addQuestion(topicId, weight, title, description));
        },
        addAnswer(questionId){
            dispatch(addAnswer(questionId, 'add answer', 'radio'))
        }
    };
};

TestPageContainer.propTypes = {
    //redux
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            description: PropTypes.string,
            weight: PropTypes.number,
            topicId: PropTypes.number
        })
    ),
    addQuestion: PropTypes.func,
    getQuestions: PropType.func,
    addAnswer: PropType.func
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TestPageContainer)
);

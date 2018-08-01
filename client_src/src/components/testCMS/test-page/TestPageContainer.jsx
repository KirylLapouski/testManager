import React from 'react'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import { loadQuestion, addQuestion } from '../../../redux/AC/question'
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import toastr from 'toastr'
import TestPage from "./TestPage";
//TODO: decouple adding new question in new component
class TestPageContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            weight: 1,
            modalOpened: false
        }
    }
    handleChange = name => event => {
        //TODO: toastr there or in presented comp?
        if (name == 'weight' && (event.target.value == 1000 || event.target.value == 0)) {
            toastr.warning('Вес вопроса должен находится в интервале от 1 до 1000')
            return
        }
        this.setState({
            [name]: event.target.value,
        });
    };

    openModal = () => {
        this.setState({
            modalOpened: true
        })
    }

    closeModal = () => {
        this.setState({
            modalOpened: false
        })
    }

    handleSubmitNewQuestionForm = (e) => {
        e.preventDefault()

        var { title, description, weight } = this.state
        if (weight < 1 || weight > 1000) {
            toastr.error('Вес вопроса должен находится в интервале от 1 до 1000')
            return
        }
        this.props.addQuestion(this.props.match.params.topicId, weight, title, description)
    }

    componentWillMount() {
        this.props.getQuestions(this.props.match.params.topicId)
    }

    render() {
        return <TestPage
            handleChange={this.handleChange}
            openModal={this.openModal}
            closeModal={this.closeModal}
            handleSubmitNewQuestionForm={this.handleSubmitNewQuestionForm}
            {...this.props}
            {...this.state} />
    }
}

const mapStateToProps = (state, ownProps) => {
    var res = []
    for (var key in state.questions) {
        if (Number(ownProps.match.params.topicId) === state.questions[key].topicId) {
            res.push(state.questions[key])
        }
    }
    return { questions: res }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions(topicId) {
            dispatch(loadQuestion(topicId))
        },
        addQuestion(topicId, weight, title, description) {
            dispatch(addQuestion(topicId, weight, title, description))
        }
    }
}

TestPageContainer.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        weight: PropTypes.number,
        topicId: PropTypes.number
    })),
    addQuestion: PropTypes.func,
    getQuestions: PropType.func
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPageContainer))

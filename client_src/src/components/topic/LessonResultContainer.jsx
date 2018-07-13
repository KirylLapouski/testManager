import React from 'react'
import LessonResult from "./LessonResult";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { getUserTestsResultsForLesson } from '../../redux/AC/users';
import { loadQuestionsForLesson } from '../../redux/AC/question'
class LessonResultContainer extends React.Component {

    componentDidMount() {
        this.props.getLessonQuestionsResult(this.props.match.params.lessonId, this.props.loggedUserId)
        this.props.getAllQuestionsForLesson(this.props.match.params.lessonId)
    }
    render() {
        var { rightAnswersWeight, wrongAnswersWeight, questions } = this.props
        return <LessonResult wrongAnswerWeight={wrongAnswersWeight} rightAnswersWeight={rightAnswersWeight} questions={questions} />
    }
}

const getQuestionsInLesson = (state, lessonId) => {
    var topics = [], questions = [], topicsId;

    for (const key in state.topics) {
        if (state.topics.hasOwnProperty(key) && state.topics[key].lessonId === +lessonId)
            topics.push(state.topics[key])

    }
    topicsId = topics.map(value => value.id)
    for (const key in state.questions) {
        if (state.questions.hasOwnProperty(key) && topicsId.includes(state.questions[key].topicId))
            questions.push(state.questions[key])
    }

    return questions
}
const mapStateToProps = (state, ownProps) => {
    var idRightAnsweredQuestions = [...(state.users.loggedIn.rightAnswered || [])]
    var questionsInLesson = getQuestionsInLesson(state, ownProps.match.params.lessonId)
    var weightOfQuestionsInLesson = questionsInLesson.reduce((acc, value) => acc + value.weight, 0)
    var rightAnsweredQuestionsInThisLesson = questionsInLesson.filter(value => idRightAnsweredQuestions.includes(value.id))
    var weightOfRightAnsweredQuestionsInThisLesson = rightAnsweredQuestionsInThisLesson.reduce((acc, value) => acc + value.weight, 0)

    var questions = questionsInLesson.map(value => {
        if (idRightAnsweredQuestions.includes(value.id)) {
            value.rightAnswered = true
        } else {
            value.rightAnswered = false
        }
        return value
    })

    return {
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id,
        wrongAnswersWeight: 100 - (weightOfRightAnsweredQuestionsInThisLesson * 100 / weightOfQuestionsInLesson),
        rightAnswersWeight: weightOfRightAnsweredQuestionsInThisLesson * 100 / weightOfQuestionsInLesson,
        questions
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLessonQuestionsResult(lessonId, userId) {
            dispatch(getUserTestsResultsForLesson(lessonId, userId))
        },
        getAllQuestionsForLesson(lessonId) {
            dispatch(loadQuestionsForLesson(lessonId))
        }
    }
}
LessonResultContainer.propTypes = {
    //redux
    questions: PropTypes.array,
    loggedUserId: PropTypes.number,
    rightAnswersWeight: PropTypes.number,
    wrongAnswersWeight: PropTypes.number,
    passedQuestions: PropTypes.array,
    getLessonQuestionsResult: PropTypes.func,
    getAllQuestionsForLesson: PropTypes.func
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonResultContainer))

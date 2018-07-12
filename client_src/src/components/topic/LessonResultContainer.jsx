import React from 'react'
import LessonResult from "./LessonResult";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { getUserTestsResultsForLesson } from "../../redux/AC/users";
class LessonResultContainer extends React.Component {

    componentDidMount() {
        this.props.getLessonQuestionsResult(this.props.match.params.lessonId, this.props.loggedUserId)
    }
    render() {
        return <LessonResult />
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
    var userQuestionsResult = [...(state.users.loggedIn.answeredQuestions || [])]
    var questionsInLesson = getQuestionsInLesson(state, ownProps.match.params.lessonId)
    var answeredQuestionsInThisLesson = questionsInLesson.filter(value => userQuestionsResult.includes(value.id))
    //TODO:

    return {
        loggedUserId: state.users.loggedIn && state.users.loggedIn.id
    }
    //  ((value) => value)
    //     .then(questions => {
    //         return questions.filter(value => {
    //             return passedQuestions.indexOf(value.id) !== -1 ? true : false
    //         })
    //     }).then(value => { return { passedQuestions: value } })



}
const mapDispatchToProps = (dispatch) => {
    return {
        getLessonQuestionsResult(lessonId, userId) {
            dispatch(getUserTestsResultsForLesson(lessonId, userId))
        }
    }
}
LessonResultContainer.propTypes = {
    //redux
    loggedUserId: PropTypes.number,
    rightAnswersWeight: PropTypes.number,
    wrongAnswersWeight: PropTypes.number,
    passedQuestions: PropTypes.array,
    getLessonQuestionsResult: PropTypes.func
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonResultContainer))

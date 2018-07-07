import React from 'react'
import LessonResult from "./LessonResult";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { getUserTestsResultsForLesson } from "../../redux/AC/users";
class LessonResultContainer extends React.Component {

    componentDidMount() {
        this.props.getLessonQuestionsResult(this.props.match.params.lessonId)
    }
    render() {
        return <LessonResult />
    }
}

const mapStateToProps = (state, ownProps) => {
    var passedQuestions = [...(state.users.loggedIn.answeredQuestions || [])]
    return getUserTestsResultsForLesson(ownProps.match.params.lessonId)((value) => value)
        .then(questions => {
            return questions.filter(value => {
                return passedQuestions.indexOf(value.id) !== -1 ? true : false
            })
        }).then(value => { return { passedQuestions: value } })

}
const mapDispatchToProps = (dispatch) => {
    return {
        getLessonQuestionsResult(lessonId) {
            dispatch(getUserTestsResultsForLesson(lessonId))
        }
    }
}
LessonResultContainer.propTypes = {
    //redux
    passedQuestions: PropTypes.array,
    getLessonQuestionsResult: PropTypes.func
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonResultContainer))

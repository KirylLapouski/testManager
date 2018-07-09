import constants from '../constants'
import {
    uniqueArray
} from "../../utils";
const users = (state = {}, action) => {
    switch (action.type) {
        case constants.users.ADD_LOGGED_IN_USER:
            return {
                ...state,
                loggedIn: { ...state.loggedIn,
                    ...action.payload
                }
            }
        case constants.users.SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER:
            console.log(action.payload.questions)
            var newState = {
                ...state
            }
            var loggedInUser = Object.assign({}, newState.loggedIn)
            var questionsId = action.payload.questions.map(value => {
                return value.id
            })
            loggedInUser.answeredQuestions = uniqueArray([...(state.loggedIn.answeredQuestions || []), ...questionsId]).map(value => +value)

            var rightAnsweredId = action.payload.questions.filter(value => {
                    return value.isRightAnswered
                })
                .map(value => value.id)
            loggedInUser.rightAnswered = uniqueArray([...(state.loggedIn.rightAnswered || []), ...rightAnsweredId]).map(value => +value)

            newState.loggedIn = loggedInUser
            return newState
        case constants.users.ADD_USER:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case constants.users.ADD_RIGHT_ANSWERED_QUESTION_FOR_LOGGED_IN:
            var loggedIn = {
                ...state.loggedIn
            }
            loggedIn.rightAnswered = uniqueArray([...(loggedIn.rightAnswered || []), action.payload.questionId]).map(value => +value)
            return {
                ...state,
                loggedIn: loggedIn
            }
        case constants.users.ADD_WRONG_ANSWERED_QUESTION_FOR_LOGGED_IN:
            var rightAnswered = state.loggedIn.rightAnswered.map(value => {
                if (value !== action.payload.questionId) return value
            }).filter(value => !!value && value)
            var loggedIn = {
                ...state.loggedIn
            }
            loggedIn.rightAnswered = rightAnswered
            return {
                ...state,
                loggedIn
            }
        default:
            return state

    }
}
export default users

import constants from '../constants'
import {
    uniqueArrayOfPrimitives
} from "../../utils";
const users = (state = {}, action) => {
    switch (action.type) {
        case constants.users.ADD_LOGGED_IN_USER:
            return {
                ...state,
                loggedIn: {
                    ...state.loggedIn,
                    ...action.payload
                }
            }
        case constants.users.SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER:
            var newState = {
                ...state
            }
            var loggedInUser = Object.assign({}, newState.loggedIn)
            var questionsId = action.payload.questions.map(value => {
                return value.id
            })
            loggedInUser.answeredQuestions = uniqueArrayOfPrimitives([...(state.loggedIn.answeredQuestions || []), ...questionsId]).map(value => +value)

            var rightAnsweredId = action.payload.questions.filter(value => {
                return value.isRightAnswered
            })
                .map(value => value.id)
            loggedInUser.rightAnswered = uniqueArrayOfPrimitives([...(state.loggedIn.rightAnswered || []), ...rightAnsweredId]).map(value => +value)

            newState.loggedIn = loggedInUser
            return newState
        case constants.users.ADD_USER:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case constants.users.ADD_USERS:
            var usersToAdd = action.payload.users.reduce((acc, value) => {
                acc[value.id] = value
                return acc
            }, {})
            return {
                ...state,
                ...usersToAdd
            }
        case constants.users.ADD_RIGHT_ANSWERED_QUESTION_FOR_LOGGED_IN:
            var loggedIn = {
                ...state.loggedIn
            }
            loggedIn.rightAnswered = uniqueArrayOfPrimitives([...(loggedIn.rightAnswered || []), action.payload.questionId]).map(value => +value)
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

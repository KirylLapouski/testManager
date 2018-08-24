import constants from '../constants'
import { uniqueArrayOfPrimitives } from '../../utils'
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
        let newState = {
            ...state
        }
        let loggedInUser = Object.assign({}, newState.loggedIn)
        let questionsId = action.payload.questions.map(value => {
            return value.id
        })
        loggedInUser.answeredQuestions = uniqueArrayOfPrimitives([
            ...(state.loggedIn.answeredQuestions || []),
            ...questionsId
        ]).map(value => +value)

        let rightAnsweredId = action.payload.questions
            .filter(value => {
                return value.isRightAnswered
            })
            .map(value => value.id)
        loggedInUser.rightAnswered = uniqueArrayOfPrimitives([
            ...(state.loggedIn.rightAnswered || []),
            ...rightAnsweredId
        ]).map(value => +value)

        newState.loggedIn = loggedInUser
        return newState
    case constants.users.ADD_USER:
        return {
            ...state,
            [action.payload.id]: action.payload
        }
    case constants.users.ADD_USERS:
        let usersToAdd = action.payload.users.reduce((acc, value) => {
            acc[value.id] = value
            return acc
        }, {})
        return {
            ...state,
            ...usersToAdd
        }
    case constants.users.ADD_RIGHT_ANSWERED_QUESTION_FOR_LOGGED_IN:
        let loggedIn = {
            ...state.loggedIn
        }
        loggedIn.rightAnswered = uniqueArrayOfPrimitives([
            ...(loggedIn.rightAnswered || []),
            action.payload.questionId
        ]).map(value => +value)
        return {
            ...state,
            loggedIn: loggedIn
        }
    case constants.users.ADD_WRONG_ANSWERED_QUESTION_FOR_LOGGED_IN:
        let rightAnswered = state.loggedIn.rightAnswered
            .map(value => value !== action.payload.questionId)
            .filter(value => !!value && value)
        let newLoggedIn = {
            ...state.loggedIn
        }
        newLoggedIn.rightAnswered = rightAnswered
        return {
            ...state,
            newLoggedIn
        }
    case constants.users.DELETE_USER:
        newState = {...state}
        delete newState[action.payload.userId]
        return newState
    default:
        return state
    }
}
export default users

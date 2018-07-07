import constants from '../constants'
const users = (state = {}, action) => {
    switch (action.type) {
        case constants.users.ADD_LOGGED_IN_USER:
            return {
                ...state,
                loggedIn: action.payload
            }
        case constants.users.SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER:
            var newState = {
                ...state
            }
            var loggedInUser = Object.assign({}, newState.loggedIn)
            var questionsId = action.payload.questions.map((value) => {
                return value.id
            })
            loggedInUser.answeredQuestions = [...(state.loggedIn.answeredQuestions || []), ...questionsId]
            newState.loggedIn = loggedInUser
            return newState
        case constants.users.ADD_USER:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        default:
            return state

    }
}
export default users

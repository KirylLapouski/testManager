import constants from '../constants'
//TODO: check immutable
const users = (state = {}, action) => {
    switch (action.type) {
    case constants.users.LOGGED_IN_USER:
        return {
            ...state,
            'loggedIn': action.payload
        }
    case constants.users.SUBMIT_RESULT_OF_QUESTION:
        var newState = { ...state
        }
        var loggedInUser = Object.assign({}, newState.loggedIn)
        var questionsId = action.payload.questions.map((value) => {
            return value.id
        })
        loggedInUser.answeredQuestions = questionsId,
        newState.loggedIn = loggedInUser
        return newState
    case constants.users.ADD_IMAGE_TO_USER:
        var newState = { ...state
        }
        newState.loggedIn = action.payload
        return newState
    case constants.users.GET_USER:
        return {
            ...state,
            [action.payload.id]: action.payload
        }
    case constants.users.ATTACH_USER_TO_COURSE:
        return{
            ...state
        }
    default:
        return state

    }
}
export default users

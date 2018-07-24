import constants from '../constants'

const questions = (state = {}, action) => {
    switch (action.type) {
        case constants.questions.ADD_QUESTION:
            return {
                ...state,
                [action.payload.id]: {
                    ...action.payload
                }
            }
        case constants.questions.ADD_QUESTIONS:
            var questions = action.payload.reduce((result, question) => {
                result[question.id] = question
                return result
            }, {})
            return {
                ...state,
                ...questions
            }
        case constants.questions.DELETE_QUESTION:
            var newState = {
                ...state
            }
            delete newState[action.payload.questionId]
            return {
                ...newState
            }
        case constants.questions.UPDATE_QUESTION:
            var newState = { ...state }
            newState[action.payload.id] = action.payload
            return {
                ...newState
            }
        default:
            return state
    }
}
export default questions

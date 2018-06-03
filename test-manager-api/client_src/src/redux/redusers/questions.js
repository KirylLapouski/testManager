import constants from '../constants'

const questions = (state = {}, action) => {
    switch (action.type) {
    case constants.questions.CREATE_QUESTION:
        return {
            ...state,
            [action.payload.id]: {
                ...action.payload
            }
        }
    case constants.questions.LOAD_QUESTIONS_FOR_TOPIC:
        var questions = action.payload.reduce((result, question) => {
            result[question.id] = question
            return result
        }, {})
        return {
            ...state,
            ...questions
        }
    case constants.questions.DELETE_QUESTION:
        var newState = { ...state}
        delete newState[action.payload.questionId]
        return {
            ...newState
        }
    }
    return state
}
export default questions

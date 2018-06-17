import constants from '../constants'


const answers = (state = {}, action) => {
    switch (action.type) {
    case constants.answers.ADD_ANSWER:
        return {
            ...state,
            [action.payload.id]: { ...action.payload
            }
        }
    case constants.answers.ADD_ANSWERS:
        var answers = action.payload.reduce((result, answer) => {
            result[answer.id] = answer
            return result
        }, {})
        return {
            ...state,
            ...answers
        }
    case constants.answers.DELETE_ANSWER:
        var newState = { ...state
        }
        delete newState[action.payload.answerId]
        return {
            ...newState
        }
    case constants.answers.UPDATE_ANSWER:
        var newState = {...state}
        newState[action.payload.id] = action.payload
        return{
            ...newState
        }
    }
    return state
}
export default answers

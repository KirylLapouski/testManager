import constants from '../constants'
import axios from 'axios'
const addAnswer = (questionId, text = ' ') => {
    return dispatch => {
        axios.post(`http://localhost:3000/api/Questions/${questionId}/answers`, {
            isRight: false,
            text: text
        })
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.answers.ADD_ANSWER,
                    payload: { ...data
                    }
                })
            })
    }
}

const loadAnswers = questionId => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/Questions/${questionId}/answers`)
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.answers.LOAD_ANSWERS_FOR_QUESTION,
                    payload: response
                })
            })
    }
}

const deleteAnswer = answerId => {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/Answers/${answerId}`)
            .then(() => {
                dispatch({
                    type: constants.answers.DELETE_ANSWER,
                    payload:{
                        answerId
                    }
                })
            })
    }
}
window.deleteAnswer = deleteAnswer
export {
    addAnswer,
    loadAnswers,
    deleteAnswer
}

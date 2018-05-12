import constants from '../constants'
import UUID from 'uuid-js'
import axios from 'axios'
const addAnswer = (text,typeOfAnswer)=>{
    return {
        type: constants.answers.ADD_ANSWER,
        payload: {
            id: UUID.create().toString(),
            text,
            typeOfAnswer
        }
    }
}

const loadAnswers = topicId => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/Questions/${topicId}/answers`)
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

export {addAnswer, loadAnswers}
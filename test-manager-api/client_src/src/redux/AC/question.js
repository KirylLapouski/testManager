import constants from '../constants'
import UUID from 'uuid-js'
import axios from 'axios'
const addQuestion = (weight,title,description) => {
    return {
        type: constants.questions.CREATE_QUESTION,
        payload: {
            id: UUID.create().toString(),
            title: title,
            weight:weight,
            description:description
        }
    }
}

const loadQuestion = topicId => {
    return dispatch => {
        axios.get('http://localhost:3000/api/Topics/' + topicId + '/questions')
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.questions.LOAD_QUESTIONS_FOR_TOPIC,
                    payload: response
                })
            })
    }
}


export {
    addQuestion,
    loadQuestion
}

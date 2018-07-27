import constants from '../constants'
import axios from 'axios'
const addQuestion = (topicId, weight, title, description = ' ') => {
    return dispatch => {
        axios.post('http://localhost:3000/api/Questions', {
            title,
            description,
            weight,
            topicId
        })
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.questions.ADD_QUESTION,
                    payload: {
                        ...data
                    }
                })
            })
    }
}

const loadQuestionsForLesson = lessonId => {
    return dispatch => {
        return axios.get(`http://localhost:3000/api/Lessons/${lessonId}/topics`)
            .then(values => {
                return Promise.all(values.data.map(value => value.id).map(topicsId => {
                    return loadQuestion(topicsId)(dispatch)
                }))
            })
    }
}
const loadQuestion = topicId => {
    return dispatch => {
        return axios.get(`http://localhost:3000/api/Topics/${topicId}/questions`)
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.questions.ADD_QUESTIONS,
                    payload: response
                })
                return response
            })
    }
}

const deleteQuestion = questionId => {
    return dispatch => {
        axios.delete(`http://localhost:3000/api/Questions/${questionId}`)
            .then(() => {
                dispatch({
                    type: constants.questions.DELETE_QUESTION,
                    payload: {
                        questionId
                    }
                })
            })
    }
}

const updateQuestion = (questionId, title) => {
    return dispatch => {
        axios.patch('http://localhost:3000/api/Questions', {
            id: questionId,
            title
        })
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.questions.UPDATE_QUESTION,
                    payload: {
                        ...data
                    }
                })
            })
    }
}

const createTestFromFile = (topicId, file) => {
    return dispatch => {
        const formData = new FormData()
        formData.append('file', file)

        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        return axios.post(`http://localhost:3000/${topicId}/parseQuestion`, formData, config)
            .then(() => {
                dispatch(loadQuestion(topicId))
            }, (err) => {
                switch (err.message) {
                    case 'Network Error':
                        throw new Error('Ошибка сети, сервер недоступен')
                    default:
                        throw new Error('Ошибка создания теста')
                }
            })

    }
}
export {
    addQuestion,
    loadQuestion,
    deleteQuestion,
    updateQuestion,
    createTestFromFile,
    loadQuestionsForLesson
}

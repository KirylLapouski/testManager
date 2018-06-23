import constants from '../constants'
import axios from 'axios'
import toastr from 'toastr'
const addQuestion = (topicId, weight, title, description = ' ') => {
    console.log(topicId, weight,title)
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

const loadQuestion = topicId => {
    return dispatch => {
        axios.get('http://localhost:3000/api/Topics/' + topicId + '/questions')
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.questions.ADD_QUESTIONS,
                    payload: response
                })
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

        var xhr = new XMLHttpRequest()

        xhr.open('POST', `http://localhost:3000/${topicId}/parseQuestion`, true)

        xhr.onload = () => {
            if (xhr.status === 201)
                dispatch(loadQuestion(topicId))
            if (xhr.status === 400) {
                return toastr.error('Ошибка при создании теста из файла',xhr.responseText)
            }

        }
        xhr.send(formData)
    }
}
export {
    addQuestion,
    loadQuestion,
    deleteQuestion,
    updateQuestion,
    createTestFromFile
}
import constants from '../constants'
import axios from 'axios'
const addTopic = (lessonId, node, title) => {
    return dispatch => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        let formData = new FormData()
        formData.append('path', node)
        formData.append('lessonId', lessonId)
        formData.append('title', title || ' ')

        return axios
            .post('http://localhost:3000/api/Topics', formData, config)
            .then(
                ({ data: body }) => {
                    dispatch({
                        type: constants.topics.ADD_TOPIC,
                        payload: {
                            ...body
                        }
                    })
                    return body
                },
                err => {
                    switch (err.message) {
                    case 'Network Error':
                        throw new Error('Ошибка сети, сервер недоступен')
                    default:
                        throw new Error('Ошибка при добаввлении топика')
                    }
                }
            )
    }
}

const addTopics = lessonId => {
    return dispatch => {
        axios
            .get(`http://localhost:3000/api/Lessons/${lessonId}/topics`)
            .then(({ data: response }) => {
                dispatch({
                    type: constants.topics.ADD_TOPICS,
                    payload: response
                })
            })
    }
}

const addQuestionIdToTopic = topicID => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Topics/${topicID}/questions`)
            .then(({ data: response }) => {
                dispatch({
                    type: constants.topics.ADD_TOPIC_QUESTIONS,
                    payload: {
                        questions: response,
                        topicId: topicID
                    }
                })
                return response
            })
    }
}

const updateTopic = (topicId, editorState) => {
    return dispatch => {
        axios
            .patch('http://localhost:3000/api/Topics', {
                id: topicId,
                path: editorState
            })
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.topics.UPDATE_TOPIC,
                    payload: {
                        ...response
                    }
                })
            })
    }
}

const deleteTopic = topicId => {
    return dispatch => {
        return axios
            .delete(`http://localhost:3000/api/Topics/${topicId}`)
            .then(({ data: value }) => {
                if (value.count) {
                    dispatch({
                        type: constants.topics.DELETE_TOPIC,
                        payload: {
                            id: topicId
                        }
                    })
                }
            })
    }
}

export { addTopic, addTopics, addQuestionIdToTopic, updateTopic, deleteTopic }

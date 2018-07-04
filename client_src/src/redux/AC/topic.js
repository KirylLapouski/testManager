import constants from '../constants'
import request from 'request'
import axios from 'axios'
const addTopic = (lessonId, node, title) => {
    return dispatch => {
        request.post('http://localhost:3000/api/Topics', {
            form: {
                path:node,
                lessonId: lessonId,
                title: title || ' '
            }
        }, (err, response,body) => {
            dispatch({
                type: constants.topics.ADD_TOPIC,
                payload: {
                    ...JSON.parse(body)
                }
            })
        })
    }
}

const loadTopics = lessonId => {
    return dispatch => {
        axios.get('http://localhost:3000/api/Lessons/' + lessonId + '/topics')
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.topics.ADD_TOPICS,
                    payload: response
                })
            })
    }
}

const addQuestionIdToTopic = topicID => {
    return dispatch => {
        axios.get('http://localhost:3000/api/Topics/' + topicID + '/questions')
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.topics.ADD_TOPIC_QUESTIONS,
                    payload: {
                        questions: response,
                        topicId: topicID
                    }
                })
            })
    }
}

const updateTopic = (topicId, editorState) =>{
    return dispatch =>{
        axios.patch('http://localhost:3000/api/Topics',{ id: topicId, path:editorState })
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

window.updateTopic = updateTopic
export {
    addTopic,
    loadTopics,
    addQuestionIdToTopic,
    updateTopic
}

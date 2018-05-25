import constants from '../constants'
import UUID from 'uuid-js'
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
            body = JSON.parse(body)
            dispatch({
                type: constants.topics.CREATE_TOPIC,
                payload: {
                    title: body.title,
                    id: body.id,
                    path: body.path,
                    lessonId: body.lessonId
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
                    type: constants.topics.LOAD_TOPICS_FOR_LESSON,
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
                    type: constants.topics.LOAD_TOPIC_QUESTIONS,
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

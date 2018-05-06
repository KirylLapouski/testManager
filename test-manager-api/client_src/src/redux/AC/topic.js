import constants from '../constants';
import UUID from 'uuid-js';
import axios from 'axios'
const addTopic = path=>{
    return {
        type: constants.topics.CREATE_TOPIC,
        payload: {
            id: UUID.create().toString(),
            path
        }
    }
}

const loadTopics = lessonId =>{
    return dispatch =>{
        axios.get('http://localhost:3000/api/Lessons/' + lessonId + '/topics')
            .then(response=>{
                return response.data
            })
            .then(response=>{
                dispatch({
                    type: constants.topics.LOAD_TOPICS_FOR_LESSON,
                    payload: response
                  })
            })
    }
}

export {addTopic,loadTopics}
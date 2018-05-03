import constants from '../constants';
import UUID from 'uuid-js';

const addTopic = (path)=>{
    return {
        type: constants.topics.CREATE_TOPIC,
        payload: {
            id: UUID.create().toString(),
            path
        }
    }
}

export {addTopic}
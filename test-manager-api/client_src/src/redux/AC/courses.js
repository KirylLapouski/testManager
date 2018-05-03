import constants from '../constants';
import UUID from 'uuid-js';

const addCourse = (title)=>{
    return {
        type: constants.courses.CREATE_COURSE,
        payload: {
            id: UUID.create().toString(),
            title:title
        }
    }
}
export {addCourse}
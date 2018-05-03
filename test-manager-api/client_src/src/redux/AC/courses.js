import constants from '../constants';

const addCourse = (title)=>{
    return {
        type: constants.courses.CREATE_COURSE,
        title: title
    }
}
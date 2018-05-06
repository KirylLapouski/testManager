import constants from '../constants';
import UUID from 'uuid-js';
import axios from 'axios';

const addLesson = (title) => {
  return {
    type: constants.lessons.CREATE_LESSON,
    payload: {
      id: UUID.create().toString(),
      title: title
    }
  }
}

const loadLessons = (courseId) => {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/Disciplines/' +  courseId + '/lessons')
      .then(response => {
        return response.data
      })
      .then(response => {
        dispatch({
          type: constants.lessons.LOAD_LESSONS_FOR_DISCIPLINE,
          payload: response
        })
      })
  }
}

export {
  addLesson,
  loadLessons
};

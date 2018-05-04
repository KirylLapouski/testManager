import constants from '../constants';
import UUID from 'uuid-js';
import axios from 'axios';

const addCourse = (title) => {
  return {
    type: constants.courses.CREATE_COURSE,
    payload: {
      id: UUID.create().toString(),
      title: title
    }
  }
}

const loadCourses = () => {
  return (dispatch) => {
    axios.get('http://localhost:3000/api/Disciplines')
      .then(response => {
        return response.data
      })
      .then(response => {
          var payload = response.map(course=>{
              console.log(course)
          })
          dispatch({
            type: constants.courses.LOAD_COURSES,
            payload
          })
      })
  }
}
export {
  addCourse
}

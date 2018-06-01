import constants from '../constants'
import axios from 'axios'
const addCourse = (userId, title = ' ') => {
    var id
    return dispatch => {

        console.log(title)
        axios.post('http://localhost:3000/api/Disciplines', {
            title
        })
            .then(({
                data
            }) => {
                id = data.id
                //TODO: acn rewrite on remote hooks on back end
                return axios.post('http://localhost:3000/api/ParticipantDisciplineMappings', {
                    type: 'teacher',
                    participantId: userId,
                    disciplineId: data.id
                })
            })
            .then(() => {
                dispatch({
                    type: constants.courses.CREATE_COURSE,
                    payload: {
                        id,
                        title
                    }
                })
            })

    }
}

const loadCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/api/Disciplines')
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.courses.LOAD_COURSES,
                    payload: response
                })
            })
    }
}

const loadCoursesForUser = userId => {
    return (dispatch) => {
        axios.get(`http://localhost:3000/api/Participants/${userId}/disciplines`)
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.courses.LOAD_COURSES,
                    payload: response
                })
            })
    }
}

export {
    addCourse,
    loadCourses,
    loadCoursesForUser
}

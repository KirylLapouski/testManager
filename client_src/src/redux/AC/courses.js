import constants from '../constants'
import axios from 'axios'
import { getUserById } from './users'
const addCourse = (
    userId,
    title = ' ',
    backgroundUrl = 'http://clipart-library.com/images/8ixrj6j7T.jpg'
) => {
    let id, secretWord
    return dispatch => {
        return axios
            .post('http://localhost:3000/api/Disciplines', {
                title,
                backgroundUrl
            })
            .then(({ data }) => {
                id = data.id
                secretWord = data.secretWord
                //TODO: acn rewrite on remote hooks on back end
                return axios.post(
                    'http://localhost:3000/api/ParticipantDisciplineMappings',
                    {
                        type: 'teacher',
                        participantId: userId,
                        disciplineId: data.id
                    }
                )
            })
            .then(() => {
                dispatch({
                    type: constants.courses.ADD_COURSE,
                    payload: {
                        id,
                        title,
                        ownerId: userId,
                        secretWord,
                        backgroundUrl
                    }
                })
                return {
                    id,
                    title,
                    ownerId: userId,
                    secretWord,
                    backgroundUrl
                }
            })
    }
}

const addCourseByLessonId = lessonId => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Lessons/${lessonId}/discipline`)
            .then(({ data: response }) => {
                dispatch({
                    type: constants.courses.ADD_COURSE,
                    payload: {
                        id: response.id,
                        title: response.title,
                        secretWord: response.secretWord,
                        backgroundUrl: response.backgroundUrl
                    }
                })

                return response
            })
    }
}
const loadCourses = () => {
    return dispatch => {
        axios
            .get('http://localhost:3000/api/Disciplines')
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.courses.ADD_COURSES,
                    payload: response
                })
            })
    }
}

const loadCoursesForUser = userId => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Participants/${userId}/disciplines`)
            .then(({ data }) => {
                dispatch({
                    type: constants.courses.ADD_COURSES,
                    payload:data
                })
                return data
            })
    }
}

const getCourseOwner = courseId => {
    return dispatch => {
        return axios
            .get(
                `http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22type%22%3A%22teacher%22%2C%22disciplineId%22%3A${courseId}%7D%7D`
            )
            .then(({ data }) => {
                if (!data[0]) return
                dispatch({
                    type: constants.courses.ADD_OWNER_TO_COURSE,
                    payload: {
                        courseId,
                        ownerId: data[0].participantId
                    }
                })
                return getUserById(data[0].participantId)(dispatch)
            })
    }
}

const updateCourse = (id, course) => {
    //TODO: error handling
    return dispatch => {
        axios
            .patch(`http://localhost:3000/api/Disciplines/${id}`, course)
            .then(({ data }) => {
                dispatch({
                    type: constants.courses.UPDATE_COURSE,
                    payload: {
                        ...data
                    }
                })
            })
    }
}

const deleteCourse = courseId => {
    return dispatch => {
        return axios.delete(`http://localhost:3000/api/Disciplines/${courseId}`)
            .then(({ data: count }) => {
                if (!count.count) {
                    throw new Error(`Ошибка удаления: курса с id ${courseId} не существует`)
                }

                dispatch({
                    type: constants.courses.DELETE_COURSE,
                    payload: {
                        courseId
                    }
                })
            })
    }
}

export {
    addCourse,
    loadCourses,
    deleteCourse,
    loadCoursesForUser,
    getCourseOwner,
    updateCourse,
    addCourseByLessonId
}

import constants from '../constants'
import axios from 'axios'
const addLesson = (title, disciplineId, desc) => {
    return dispatch => {
        let id
        return axios
            .post('http://localhost:3000/api/Lessons/', {
                title,
                disciplineId,
                desc
            })
            .then(response => {
                if (response.status === 200) {
                    id = response.data.id
                    return
                } else throw new Error()
            })
            .then(
                response => {
                    dispatch({
                        type: constants.lessons.ADD_LESSON,
                        payload: {
                            id,
                            title: title,
                            disciplineId: Number(disciplineId)
                        }
                    })
                    return {
                        id,
                        title: title,
                        disciplineId: Number(disciplineId)
                    }
                })
    }
}

const deleteLesson = lessonId => {
    return dispatch => {
        return axios
            .delete(`http://localhost:3000/api/Lessons/${lessonId}`)
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.lessons.DELETE_LESSON,
                    payload: {
                        id: lessonId
                    }
                })
            })
    }
}

const editLesson = (lessonId, title, desctiption) => {
    let resLesson = { id: String(lessonId) }

    if (title) resLesson.title = title
    if (desctiption) resLesson.description = desctiption
    return dispatch => {
        return axios
            .patch('http://localhost:3000/api/Lessons', resLesson)
            .then(response => {
                return response.data
            })
            .then(response => {
                dispatch({
                    type: constants.lessons.UPDATE_LESSON,
                    payload: {
                        ...response
                    }
                })
            })
    }
}
const loadLessons = courseId => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Disciplines/${courseId}/lessons`)
            .then(({ data: response }) => {
                dispatch({
                    type: constants.lessons.ADD_LESSONS,
                    payload: response
                })
                return response
            })
    }
}

const addLessonById = lessonId => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Lessons/${lessonId}`)
            .then(({ data: response }) => {
                dispatch({
                    type: constants.lessons.ADD_LESSON,
                    payload: {
                        id: response.id,
                        title: response.title,
                        disciplineId: Number(response.disciplineId)
                    }
                })
                return response
            })
    }
}

export { addLesson, loadLessons, deleteLesson, editLesson, addLessonById }

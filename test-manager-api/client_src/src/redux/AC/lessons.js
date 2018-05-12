import constants from '../constants'
import UUID from 'uuid-js'
import axios from 'axios'
//TODO: ОБРАБОТКА ОШИБОК В REACT THUNK????
const addLesson = (title, disciplineId, desc) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/Lessons/', {
            title,
            disciplineId,
            desc
        })
            .then(response => {
                if (response.status === 200)
                    return
                else
                    throw new Error()
            })
            .then(response => {
                dispatch({
                    type: constants.lessons.CREATE_LESSON,
                    payload: {
                        id: UUID.create().toString(),
                        title: title,
                        disciplineId: Number(disciplineId)
                    }
                })
            }, (error) => {
                //TODO: NEED TO DO ERROR HANDLER
                throw error
            })

    }
}

const loadLessons = (courseId) => {
    return dispatch => {
        axios.get('http://localhost:3000/api/Disciplines/' + courseId + '/lessons')
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
}

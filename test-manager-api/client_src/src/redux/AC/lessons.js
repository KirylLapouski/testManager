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

const deleteLesson = lessonId =>{
    return dispatch =>{
        axios.delete(`http://localhost:3000/api/Lessons/${lessonId}`)
            .then(response =>{
                return response.data
            })
            .then(response=>{
                dispatch({
                    type: constants.lessons.DELETE_LESSON,
                    payload:{
                        id: lessonId
                    }
                })
            })
    }
}

const editLesson = (lessonId,title,desctiption) =>{
    var resLesson = {id: String(lessonId)}

    if(title)
        resLesson.title = title
    if(desctiption)
        resLesson.description = desctiption
    return dispatch=>{
        axios.patch('http://localhost:3000/api/Lessons',resLesson)
            .then(response=>{
                return response.data
            }).then(response=>{
                dispatch({
                    type: constants.lessons.EDIT_LESSON,
                    payload:{
                        ...response
                    }
                })
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

window.editLesson = editLesson
export {
    addLesson,
    loadLessons,
    deleteLesson,
    editLesson
}

import constants from '../constants'

const lessons = (state = {}, action) => {
    switch (action.type) {
    case constants.lessons.ADD_LESSON:
        return {
            ...state,
            [action.payload.id]: {
                title: action.payload.title,              
                id: action.payload.id,
                disciplineId: action.payload.disciplineId
            }
        }
    case constants.lessons.ADD_LESSONS:
        var lessons = action.payload.reduce((result, lesson) => {
            result[lesson.id] = lesson
            return result
        }, {})
        return {
            ...state,
            ...lessons
        }
    //TODO: check is it immutable?
    case constants.lessons.DELETE_LESSON:
        var lessons = {...state}
        delete lessons[action.payload.id]
        return {
            ...lessons
        }
    case constants.lessons.EDIT_LESSON:
        var lessons = {...state}
        lessons[action.payload.id] = action.payload
        return {
            ...lessons
        }
    }
    return state
}
export default lessons
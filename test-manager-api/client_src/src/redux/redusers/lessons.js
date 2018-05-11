import constants from '../constants'

const lessons = (state = {}, action) => {
    switch (action.type) {
    case constants.lessons.CREATE_LESSON:
        return {
            ...state,
            [action.payload.id]: {
                title: action.payload.title,              
                id: action.payload.id,
                disciplineId: action.payload.disciplineId
            }
        }
    case constants.lessons.LOAD_LESSONS_FOR_DISCIPLINE:
        var lessons = action.payload.reduce((result, lesson) => {
            result[lesson.id] = lesson
            return result
        }, {})
        return {
            ...state,
            ...lessons
        }
    }
    return state
}
export default lessons

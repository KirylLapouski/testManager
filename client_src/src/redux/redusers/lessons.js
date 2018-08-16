import constants from '../constants'

const lessons = (state = {}, action) => {
    let lessons

    switch (action.type) {
        case constants.lessons.ADD_LESSON:
            return {
                ...state,
                [action.payload.id]: {
                    title: action.payload.title,
                    id: action.payload.id,
                    disciplineId: action.payload.disciplineId,
                    description: action.payload.description
                }
            }
        case constants.lessons.ADD_LESSONS:
            lessons = action.payload.reduce((result, lesson) => {
                result[lesson.id] = lesson
                return result
            }, {})
            return {
                ...state,
                ...lessons
            }
        //TODO: check is it immutable?
        case constants.lessons.DELETE_LESSON:
            lessons = { ...state }
            delete lessons[action.payload.id]
            return {
                ...lessons
            }
        case constants.lessons.UPDATE_LESSON:
            lessons = { ...state }
            lessons[action.payload.id] = action.payload
            return {
                ...lessons
            }
        default:
            return state
    }
}
export default lessons

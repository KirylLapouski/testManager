import constants from '../constants'


const courses = (state = {}, action) => {
    var constant = constants.courses
    switch (action.type) {
    case constant.CREATE_COURSE:
        return {
            ...state,
            [action.payload.id]: {
                id: action.payload.id,
                title: action.payload.title
            }
        }

    case constants.courses.LOAD_COURSES:
        var courses = action.payload.reduce((result, course) => {
            result[course.id] = course
            return result
        }, {})
        return {
            ...courses
        }

    }
    return state
}
export default courses

import constants from '../constants'

const courses = (state = {}, action) => {
    var constant = constants.courses
    switch (action.type) {
        case constant.ADD_COURSE:
            return {
                ...state,
                [action.payload.id]: {
                    ...action.payload
                }
            }

        case constants.courses.ADD_COURSES:

            var newState = { ...state
            }

            var courses = action.payload.reduce((result, course) => {
                result[course.id] = Object.assign({}, newState[course.id], course)
                delete newState[course.id]
                return result
            }, {})
            return {
                ...newState,
                ...courses
            }
        case constants.courses.DELETE_COURSE:
            var newState = { ...state
            }
            delete newState[action.payload.courseId]
            return {
                ...newState
            }
            //TODO: can concat in one reducer with update
        case constants.courses.ADD_OWNER_TO_COURSE:
            var newState = { ...state
            }
            var course = { ...newState[action.payload.courseId]
            }
            course.ownerId = action.payload.ownerId
            newState[action.payload.courseId] = course
            return newState
        case constants.courses.UPDATE_COURSE:
            var newState = { ...state
            }
            newState[action.payload.id] = action.payload
            return newState
    }


    return state
}
export default courses

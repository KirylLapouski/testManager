import constants from '../constants'
import {
    stat
} from 'fs'


const courses = (state = {}, action) => {
    var constant = constants.courses
    switch (action.type) {
    case constant.CREATE_COURSE:
        return {
            ...state,
            [action.payload.id]: {
                ...action.payload
            }
        }

    case constants.courses.LOAD_COURSES:

        var newState = {...state}

        var courses = action.payload.reduce((result, course) => {
            result[course.id] = Object.assign({},newState[course.id],course)
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
    case constants.courses.ADD_OWNER_TO_USER:
        var newState = { ...state
        }
        var course = { ...newState[action.payload.courseId]
        }
        course.ownerId = action.payload.ownerId
        newState[action.payload.courseId] = course
        return newState
    }
    return state
}
export default courses

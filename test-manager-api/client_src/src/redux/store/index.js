import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux'
import courses from '../redusers/courses'
import users from '../redusers/users'
import lessons from '../redusers/lessons'
import topics from '../redusers/topics'
import tests from '../redusers/test'
import questions from '../redusers/questions'
import answers from '../redusers/answers'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

const enhancer = compose(applyMiddleware(thunk),persistState())

const store = createStore(combineReducers({
    courses,
    users,
    lessons,
    topics,
    tests,
    questions,
    answers
}),{}, enhancer)

window.store = store
export default store

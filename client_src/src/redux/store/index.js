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
import questions from '../redusers/questions'
import answers from '../redusers/answers'
import mapping from '../redusers/mapping/mapping'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import logger from 'redux-logger'
const enhancer = compose(applyMiddleware(thunk, logger), persistState())
const store = createStore(combineReducers({
    courses,
    users,
    lessons,
    topics,
    questions,
    answers,
    mapping
}), {}, enhancer)

//development only
window.store = store
export default store

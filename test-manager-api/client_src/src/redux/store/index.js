import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import courses from '../redusers/courses';
import users from '../redusers/users';
import lessons from '../redusers/lessons';
import topics from '../redusers/topics';
import tests from '../redusers/test'
import questions from '../redusers/questions';
import answers from '../redusers/answers';
import thunk from 'redux-thunk';
import {loadCourses} from '../AC/courses';

const enhancer = applyMiddleware(thunk)

const store = createStore(combineReducers({
  courses,
  users,
  lessons,
  topics,
  tests,
  questions,
  answers
}),{}, enhancer);

window.store = store;
export default store;

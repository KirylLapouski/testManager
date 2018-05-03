import {
  createStore,
  combineReducers
} from 'redux';
import courses from '../redusers/courses';
import users from '../redusers/users';
import lessons from '../redusers/lessons';
import topics from '../redusers/topics';
import tests from '../redusers/test'
import questions from '../redusers/questions';
import answers from '../redusers/answers';

const store = createStore(combineReducers({
  courses,
  users,
  lessons,
  topics,
  tests,
  questions,
  answers
}));

window.store = store;
export default store;

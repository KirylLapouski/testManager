import constants from '../constants';
import UUID from 'uuid-js';

const addLesson = (title) => {
  return {
    type: constants.lessons.CREATE_LESSON,
    payload: {
      id: UUID.create().toString(),
      title: title
    }
  }
}

window.addLesson = addLesson;
export {
  addLesson
};

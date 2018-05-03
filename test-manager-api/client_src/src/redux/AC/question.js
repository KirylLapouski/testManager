import constants from '../constants';
import UUID from 'uuid-js';

const addQuestion = (weight,title,description) => {
  return {
    type: constants.questions.CREATE_QUESTION,
    payload: {
      id: UUID.create().toString(),
      title: title,
      weight:weight,
      description:description
    }
  }
}

export {
    addQuestion
};

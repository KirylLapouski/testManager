import constants from '../constants';

const questions = (state = {}, action) => {
  switch (action.type) {
    case constants.questions.CREATE_QUESTION:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          weight: action.payload.weight,
          description: action.payload.description
        }
      }
    case constants.questions.LOAD_QUESTIONS_FOR_TOPIC:
      var questions = action.payload.reduce((result, question) => {
        result[question.id] = question;
        return result;
      }, {});
      return {
        ...state,
        ...questions
      }
  }
  return state
}
export default questions;

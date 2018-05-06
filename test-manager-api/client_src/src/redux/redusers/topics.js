import constants from '../constants';

const topics = (state = {}, action) => {

  switch (action.type) {
    case constants.topics.CREATE_TOPIC:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          path: action.payload.path
        }
      }
    case constants.topics.LOAD_TOPICS_FOR_LESSON:
      var topics = action.payload.reduce((result, topic) => {
        result[topic.id] = topic;
        return result;
      }, {});
      return {
        ...state,
        ...topics
      }
    default:
      return state;
  }

}
export default topics;

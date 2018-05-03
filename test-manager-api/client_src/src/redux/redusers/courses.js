import constants from '../constants';

const courses = (state = {}, action) => {
    var constant = constants.courses;
  switch (action.type) {
    case constant.CREATE_COURSE:
      var id = action.id;
      return {
        ...state,
        [id]: {
          id: action.id,
          title: action.title
        }
      }
  }
  return state;
}
export default courses;

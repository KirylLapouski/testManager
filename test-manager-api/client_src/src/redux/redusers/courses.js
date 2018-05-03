import constants from '../constants';


const courses = (state = {}, action) => {
    var constant = constants.courses;
  switch (action.type) {
    case constant.CREATE_COURSE:
      var id = action.payload.id;
      return {
        ...state,
        [id]: {
          id: action.payload.id,
          title: action.payload.title
        }
      }
  }
  return state;
}
export default courses;

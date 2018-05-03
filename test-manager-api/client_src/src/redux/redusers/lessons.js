import constants from '../constants';

const lessons = (state={},action)=>{
    switch(action.type){
        case constants.lessons.CREATE_LESSON:
        var id = action.payload.id;
         return {
            ...state,
            [id]:{
                id: action.payload.id,
                title: action.payload.title
            }
        }
    }
    return state
}
export default lessons;
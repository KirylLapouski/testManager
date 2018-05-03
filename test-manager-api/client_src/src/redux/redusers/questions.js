import constants from '../constants';

const questions = (state={},action)=>{
    switch(action.type){
        case constants.questions.CREATE_QUESTION:
        var id = action.payload.id;
         return {
            ...state,
            [id]:{
                id: action.payload.id,
                title: action.payload.title,
                weight:action.payload.weight,
                description:action.payload.description
            }
        }
    }
    return state
} 
export default questions;
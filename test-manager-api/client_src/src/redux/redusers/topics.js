import constants from '../constants';

const topics = (state={},action)=>{

    switch(action.type){
        case constants.topics.CREATE_TOPIC:
        var id = action.payload.id;
        return {
            ...state,
            [id]:{
                id: action.payload.id,
                path: action.payload.path
            }
        }
    }
    return state;
} 
export default topics;
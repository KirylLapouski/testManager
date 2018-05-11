import constants from '../constants';


const answers = (state={},action)=>{
    switch(action.type){
    case constants.answers.ADD_ANSWER:
        var id = action.payload.id
         return {
            ...state,
            [id]:{
                id: action.payload.id,
                text:action.payload.text,
                typeOfAnswer: action.payload.typeOfAnswer
            }
        }
    }
    return state
}
export default answers
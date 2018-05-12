import constants from '../constants'


const answers = (state={},action)=>{
    switch(action.type){
    case constants.answers.ADD_ANSWER:
        return {
            ...state,
            [action.payload.id]:{
                id: action.payload.id,
                text:action.payload.text,
                typeOfAnswer: action.payload.typeOfAnswer
            }
        }
    case constants.answers.LOAD_ANSWERS_FOR_QUESTION:
        var answers = action.payload.reduce((result, answer) => {
            result[answer.id] = answer
            return result
        },{})
        return {
            ...state,
            ...answers
        }
    }
    return state
}
export default answers
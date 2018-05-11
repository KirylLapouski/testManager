import constants from '../constants'
import UUID from 'uuid-js'

const addAnswer = (text,typeOfAnswer)=>{
    return {
        type: constants.answers.ADD_ANSWER,
        payload: {
            id: UUID.create().toString(),
            text,
            typeOfAnswer
        }
    }
}

export {addAnswer}
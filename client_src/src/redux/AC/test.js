import constants from '../constants'
import UUID from 'uuid-js'

const addTest = ()=>{
    return {
        type: constants.tests.ADD_TEST,
        payload:{
            id: UUID.create().toString()
        }
    }
}

export {addTest}

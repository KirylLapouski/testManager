import constants from '../constants'

const tests = (state = {}, action) => {

    switch (action.type) {
        case constants.tests.ADD_TEST:
            let id = action.payload.id
            return {
                ...state,
                [id]: {
                    id: id
                }
            }
        default:
            return state
    }
}
export default tests

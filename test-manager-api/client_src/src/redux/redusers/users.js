import constants from '../constants'
const users = (state={},action)=>{
    switch(action.type){
    case constants.users.LOGGED_IN_USER:
        return {
            ...state,
            'loggedIn': action.payload
        }
    }
    return state
}
export default users
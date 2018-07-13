import constants from '../../constants';

const disciplineUser = function(state = [], action) {
    switch (action.type) {
        case constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE:
            return [
                ...state,
                ...action.payload.disciplineUser
            ]
        default:
            return state
    }
}

export default disciplineUser

import constants from '../../constants';
const disciplineUser = function(state = {}, action) {
    switch (action.type) {
        case constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE:
            let disciplineUsers = action.payload.disciplineUser.reduce((acc, value) => {
                acc[value.id] = value
                return acc
            }, {})
            return {
                ...state,
                ...disciplineUsers
            }
                default:
            return state
    }
}

export default disciplineUser

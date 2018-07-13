import disciplineUser from "./disciplineUser";

const mapping = function (state = {}, action) {
    return {
        ...state,
        userDiscipline: [
            ...disciplineUser(state.userDiscipline, action)
        ]
    }

}

export default mapping

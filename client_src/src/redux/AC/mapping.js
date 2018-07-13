import constants from "../constants";
import axios from "axios";

const addDisciplineUserMapping = (disciplineId) => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22disciplineId%22%3A${disciplineId}%7D%7D`)
            .then(({ data }) => {
                dispatch({
                    type: constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE,
                    payload: {
                        disciplineUser: data
                    }
                })
            })
    }
}
export {
    addDisciplineUserMapping
}

import constants from "../constants";
import axios from "axios";
const addAnswer = (questionId, text = " ", typeOfAnswer = "radio") => {
    return dispatch => {
        axios
            .post(`http://localhost:3000/api/Questions/${questionId}/answers`, {
                isRight: false,
                text: text,
                typeOfAnswer
            })
            .then(({ data }) => {
                dispatch({
                    type: constants.answers.ADD_ANSWER,
                    payload: {
                        ...data
                    }
                });
            });
    };
};

const loadAnswers = questionId => {
    return dispatch => {
        axios
            .get(`http://localhost:3000/api/Questions/${questionId}/answers`)
            .then(response => {
                return response.data;
            })
            .then(response => {
                dispatch({
                    type: constants.answers.ADD_ANSWERS,
                    payload: response
                });
            });
    };
};

const deleteAnswer = answerId => {
    return dispatch => {
        axios
            .delete(`http://localhost:3000/api/Answers/${answerId}`)
            .then(() => {
                dispatch({
                    type: constants.answers.DELETE_ANSWER,
                    payload: {
                        answerId
                    }
                });
            });
    };
};

const updateOrCreateAnswer = (
    text,
    isRight = false,
    questionId,
    answerId,
    typeOfAnswer = "radio"
) => {
    return dispatch => {
        axios
            .patch("http://localhost:3000/api/Answers", {
                id: answerId,
                text,
                isRight,
                questionId,
                typeOfAnswer
            })
            .then(({ data }) => {
                dispatch({
                    type: constants.answers.UPDATE_ANSWER,
                    payload: {
                        ...data
                    }
                });
            });
    };
};

export { addAnswer, loadAnswers, deleteAnswer, updateOrCreateAnswer };

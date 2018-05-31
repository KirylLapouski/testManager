import constants from '../constants'
import axios from 'axios'
import rp from 'request-promise'


const assignloggedInUser = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.users.LOGGED_IN_USER,
                    payload: { ...data
                    }
                })
            })
    }
}

const submitQuestionResult = (userId, questionId, isRightAnswered) => {
    return dispatch => {
        axios.post('http://localhost:3000/api/UserQuestions', {
            isRightAnswered,
            participantId: userId,
            questionId
        })
            .then(() => {
                return axios.get(`http://localhost:3000/api/Participants/${userId}/questions`)
            })
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.users.SUBMIT_RESULT_OF_QUESTION,
                    payload: {
                        questions: data
                    }
                })
            })
    }
}
const addImageToUser = (userId, form) => {
    return dispatch => {
        var xhr = new XMLHttpRequest()
        xhr.open('POST',`http://localhost:3000/${userId}/setAvatar`,true)

        xhr.onload = ()=>{
            xhr.open('GET',`http://localhost:3000/api/Participants/${userId}`)
            xhr.onload =(res)=>{
                dispatch({
                    type: constants.users.ADD_IMAGE_TO_USER,
                    payload: {
                        ...JSON.parse(res.currentTarget.response)
                    }
                })
            }
            xhr.send()
        }
        xhr.send(form)
    }
}

const getUserById = userId =>{
    return dispatch =>{
        axios.get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({data})=>{
                dispatch({
                    type: constants.users.GET_USER,
                    payload: {...data}
                })
            })
    }
}
window.assignloggedInUser = assignloggedInUser
export {
    assignloggedInUser,
    submitQuestionResult,
    addImageToUser,
    getUserById
}

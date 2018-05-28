import constants from '../constants'
import axios from 'axios'
const assignloggedInUser = (userId)=>{
    return dispatch =>{
        axios.get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({data})=>{
                dispatch({
                    type: constants.users.LOGGED_IN_USER,
                    payload: {...data}
                })
            })
    }
}

const submitQuestionResult = (userId, questionId, isRightAnswered) =>{
    return dispatch =>{
        axios.post('http://localhost:3000/api/UserQuestions',{
            isRightAnswered,
            participantId: userId,
            questionId
        })
            .then(()=>{
                return axios.get(`http://localhost:3000/api/Participants/${userId}/questions`)
            })
            .then(({data})=>{
                dispatch({
                    type: constants.users.SUBMIT_RESULT_OF_QUESTION,
                    payload:{
                        questions:data
                    }
                })
            })
    }
}

window.submitQuestionResult = submitQuestionResult
window.assignloggedInUser = assignloggedInUser
export {
    assignloggedInUser,
    submitQuestionResult
}
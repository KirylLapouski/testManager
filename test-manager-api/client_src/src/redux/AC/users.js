import constants from '../constants'
import axios from 'axios'


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
        axios.get(`http://localhost:3000/api/UserQuestions?filter=%7B%22where%22%3A%7B%22participantId%22%3A${userId}%2C%22questionId%22%3A${questionId}%7D%7D`)
            .then(({
                data
            }) => {
                if (data.length === 0)
                    return axios.post('http://localhost:3000/api/UserQuestions', {
                        isRightAnswered,
                        participantId: userId,
                        questionId
                    })
                else
                    return axios.patch(`http://localhost:3000/api/UserQuestions/${data[0].id}`, {
                        isRightAnswered,
                        participantId: userId,
                        questionId
                    })
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
        xhr.open('POST', `http://localhost:3000/${userId}/setAvatar`, true)
        xhr.withCredentials = true

        xhr.onload = () => {
            // if(xhr.status === 400)
            //     throw new Error(xhr.response)
            xhr.open('GET', `http://localhost:3000/api/Participants/${userId}`)
            xhr.onload = (res) => {
                dispatch({
                    type: constants.users.ADD_IMAGE_TO_USER,
                    payload: {
                        ...JSON.parse(res.currentTarget.response)
                    }
                })
            }
            xhr.send()
        }

        // xhr.onerror = ()=>{
        //     console.log('1111')
        //     throw new Error('check')
        // }
        xhr.send(form)
    }
}

const addFileToUser = (userId, form) => {
    return dispatch => {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', `http://localhost:3000/${userId}/saveFile`, true)

        xhr.onload = () => {
            console.log(xhr.status)
            // if(xhr.status)
            // xhr.open('GET', `http://localhost:3000/api/Participants/${userId}`)
            // xhr.onload = (res) => {
            //     dispatch({
            //         type: constants.users.ADD_IMAGE_TO_USER,
            //         payload: {
            //             ...JSON.parse(res.currentTarget.response)
            //         }
            //     })
            // }
            // xhr.send()
        }
        xhr.send(form)
    }
}
const getUserById = userId => {
    return dispatch => {
        axios.get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.users.GET_USER,
                    payload: { ...data
                    }
                })
            })
    }
}

const attachUserToCource = (userId, secretWord) => {
    //it is not AC it just query to back
    return dispatch => {
        axios.get(`http://localhost:3000/api/Disciplines?filter=%7B%22where%22%3A%7B%22secretWord%22%3A%22${secretWord}%22%7D%7D`)
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.courses.CREATE_COURSE,
                    payload: { ...data[0]
                    }
                })
                return axios.post('http://localhost:3000/api/ParticipantDisciplineMappings', {
                    type: 'student',
                    participantId: userId,
                    disciplineId: data[0].id
                })
            })
    }
}

const untieUserFromCourseAndDeleteCourse = (userId, courseId) => {

    return dispatch => {
        axios.get(`http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22participantId%22%3A%22${userId}%22%2C%22disciplineId%22%3A%22${courseId}%22%7D%7D`)
            .then(({
                data
            }) => {
                return axios.delete(`http://localhost:3000/api/ParticipantDisciplineMappings/${data[0].id}`)
            })
            .then(({
                data
            }) => {
                dispatch({
                    type: constants.courses.DELETE_COURSE,
                    payload: {
                        courseId
                    }
                })
            })
    }
}

const untieUserFromCourse = (userId, courseId) => {

    return dispatch => {
        axios.get(`http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22participantId%22%3A${userId}%2C%22disciplineId%22%3A${courseId}%7D%7D`)
            .then(({
                data
            }) => {
                if (data.length > 0) {
                    axios.delete(`http://localhost:3000/api/ParticipantDisciplineMappings/${data[0].id}`)
                        .then(() => {
                            dispatch({
                                type: constants.courses.DELETE_COURSE,
                                payload: {
                                    courseId
                                }
                            })
                        })
                }
            })
    }
}
export {
    assignloggedInUser,
    submitQuestionResult,
    addImageToUser,
    getUserById,
    attachUserToCource,
    untieUserFromCourseAndDeleteCourse,
    untieUserFromCourse,
    addFileToUser
}

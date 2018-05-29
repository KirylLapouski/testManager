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
const addImageToUser = (userId, image) => {
    return dispatch => {

    //     console.log('askd;a')
    //     upload.link(API_TOKEN, 'disk:/file.jpg', true, ({ href, method }) => {
    //         const fileStream = createReadStream('C:\\Users\\ЦифроваяКомпания\\Desktop\\Барни\\WP_20180518_12_59_16_Pro.jpg')
           
    //         const uploadStream = request(Object.assign(parse(href), { method }))
           
    //         fileStream.pipe(uploadStream)
           
    //         fileStream.on('end', () => uploadStream.end())
    //     })
    // // axios.patch(`http://localhost:3000/api/Participants/${userId}`, {
    //     image
    // })
    //     .then((responce) => {
    //         console.log(responce)
    //         dispatch({
    //             type: constants.users.ADD_IMAGE_TO_USER,
    //             payload:{
    //                 ...responce.data
    //             }
    //         })
    //     })
    // axios.get('https://cloud-api.yandex.net/v1/disk/resources/upload?path=check11.jpg', {
    //     headers: {
    //         Authorization: 'OAuth AQAAAAAEyQZ1AAUBQNdGxaSB8EYSg32qncCS114',
    //     }
    // })
    //     .then(responce => {
    //         console.log(responce.data.href)
    //         var oReq = new XMLHttpRequest()
    //         oReq.open('PUT', responce.data.href, true)

    //         oReq.onload = function (oEvent) {
    //             console.log(oEvent)
    //         }
    //         oReq.send(image)
    //     console.log(responce.data.href)
    //     return rp({
    //         mathod: 'PUT',
    //         uri: responce.data.href,
    //         headers: {
    //             'Content-Type': 'image/jpg'
    //         },
    //         formData: {
    //             image
    //         }
    //     })
    // })
    // .then(response => {
    //     console.log(response)
    // }, error =>{
    //     console.log(error)
    // })

    }
}

window.assignloggedInUser = assignloggedInUser
export {
    assignloggedInUser,
    submitQuestionResult,
    addImageToUser
}

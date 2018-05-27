import constants from '../constants'
import axios from 'axios'
const getloggedInUser = (userId)=>{
    return dispatch =>{
        axios.get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({data})=>{
                console.log(data)
                dispatch({
                    type: constants.users.LOGGED_IN_USER,
                    payload: {...data}
                })
            })
    }
}

export {
    getloggedInUser
}
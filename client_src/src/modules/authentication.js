import store from '../redux/store/index'
import { loginUser,addUserAndLogIn } from '../redux/AC/users'
import Cookies from 'universal-cookie'

const login = (email, password) => {
    return loginUser(email, password)(store.dispatch)
        .then(userInfo => {
            const cookies = new Cookies()

            cookies.set('loopbackToken', userInfo.loopbackToken, { maxAge: (Date.parse(userInfo.loopbackTokenExpireIn) - Date.now()) / 1000 })
            return userInfo
        })
}

const signUpAndLogin = (email, password, userName) => {
    return addUserAndLogIn(email,password,userName)(store.dispatch)
        .then(loggedInUserInfo=>{
            const cookies = new Cookies()
            cookies.set('loopbackToken', loggedInUserInfo.loopbackToken, { maxAge: (Date.parse(loggedInUserInfo.loopbackTokenExpireIn) - Date.now()) / 1000 })
            return loggedInUserInfo
        })
}

export { login,signUpAndLogin }

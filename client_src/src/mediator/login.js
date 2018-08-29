import { login } from '../utils/authentication'
import { validateEmail } from '../utils/validation'
import toastr from 'toastr'
const loginHandler = (email, password) => {
    if (!validateEmail(email)) {
        toastr.error('Неправильный формат электронной почты', 'Ошибка входа')
        return
    }
    return login(email, password).then(userInfo => {
        toastr.success(`Добро пожаловать, ${userInfo.username || 'User'}!`)
        return {
            type: 'USER_INFO',
            payload: userInfo
        }
    },
    () => {
        toastr.error('Неправильный логин или пароль', 'Ошибка входа')
        return
    })
}

export { loginHandler }

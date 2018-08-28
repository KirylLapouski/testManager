import mediator from './mediator'
import { login } from '../utils/authentication'
import { validateEmail } from '../utils/validation'
import toastr from 'toastr'
const loginHandler = (email, password) => {
    if (!validateEmail(email)) {
        toastr.error('Неправильный формат электронной почты', 'Ошибка входа')
        return
    }
    login(email, password).then()
}

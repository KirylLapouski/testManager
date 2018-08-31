import { validateImageFile } from '../modules/validation'
import store from '../redux/store/index'
import { addImageToUser } from '../modules/workingWithFiles'
import { validateEmail, validateLogin, validateName } from '../modules/validation'
import { updateLoggedInUserById } from '../redux/AC/users'
import axios from 'axios'
import toastr from 'toastr'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const addImageToUserByFile = (userId, file) => {
    let error, sendingForm
    if (error = validateImageFile(file)) {
        toastr.error(error)
        return error
    }

    sendingForm = new FormData()
    sendingForm.append('file', file)
    return addImageToUser(userId, sendingForm, !!cookies.get('yandexToken'))(store.dispatch)
        .then(() => {
            toastr.success('Изображение установлено')
        },
        err => {
            switch (err.message) {
            case 'Ошибка загрузки файла на сервер':
                toastr.error('Ошибка загрузки файла на сервер')
                break
            }
        })

}

const addImageToUserByFileField = (userId, fileField) => {
    return addImageToUserByFile(userId, fileField.files[0])
}

const changeProfileInfo = (userId, email, userName, firstName, lastName, avatarImage) => {

    if (avatarImage)
        addImageToUserByFile(userId, avatarImage)


    let user = {}
    if (email) {
        user.email = email
        if (!validateEmail(email)) {
            toastr.error('Неправильный формат электронной почты', 'Ошибка отправки формы')
            return
        }
    }
    if (userName) {
        user.username = userName
        if (!validateLogin(userName)) {
            toastr.error('Неправильный логин', 'Ошибка отправки формы')
            return
        }
    }
    if (firstName) {
        user.firstName = firstName
        if (!validateName(firstName)) {
            toastr.error('Имя введено неправильно', 'Ошибка отправки формы')
            return
        }
    }
    if (lastName) {
        user.lastName = lastName
        if (!validateName(lastName)) {
            toastr.error('Фамилия введена направильно', 'Ошибка отправки формы')
            return
        }
    }

    if (Object.keys(user).length !== 0)
        axios.patch(`http://localhost:3000/api/Participants/${userId}`, user, { timeout: 10000 })
            .then(() => {
                toastr.success('Пользователь успешно изменён')
                return updateLoggedInUserById(userId)(store.dispatch)
            }, () =>
                toastr.error('Пользователь не был изменён', 'Ошибка сервера')
            )

    // xhr.ontimeout = () => {
    //     toastr.error(
    //         'Допустимое время выполнения запроса истекло',
    //         'Ошибка сервера'
    //     )
    // }
    if (Object.keys(user).length === 0) {
        if (!avatarImage)
            toastr.error(
                'Хотя бы одно поле должно быть заполнено',
                'Ошибка отправки формы'
            )
        return
    }
}
export { addImageToUserByFile, addImageToUserByFileField, changeProfileInfo }

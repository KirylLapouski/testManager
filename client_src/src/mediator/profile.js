import { validateImageFile } from '../modules/validation'
import store from '../redux/store/index'
import { addImageToUser } from '../redux/AC/users'
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
        })

}

const addImageToUserByFileField = (userId, fileField) => {
    addImageToUserByFile(userId, fileField.files[0])
}

// TODO
const changeProfileInfo = ()=>{}
export { addImageToUserByFile, addImageToUserByFileField }

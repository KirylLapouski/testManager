import { updateLoggedInUserById } from '../redux/AC/users'
import axios from 'axios'
const addImageToUser = (userId, form, yandexUser = false) => {
    return dispatch => {
        return addFileToUser(userId, form, yandexUser)
            .then(file =>
                axios.patch(`http://localhost:3000/${userId}/setAvatar`, file)
                    .then(() => updateLoggedInUserById(userId)(dispatch))
            )
    }
}

const addFileToUser = (userId, form, yandexUser = false) => {
    const config = {
        headers: {
            'Content-type': 'multipart/form-data'
        },
        withCredentials: true
    }
    const url = yandexUser
        ? `http://localhost:3000/${userId}/saveFile`
        : `http://localhost:3000/save-file/${userId}/saveFileLocal`
    return axios.post(url, form, config).then(response => {
        return {
            url: response.data,
            type: form.get('file').type
        }
    },
    () => {
        throw new Error('Ошибка загрузки файла на сервер')
    })
}

export { addFileToUser, addImageToUser }

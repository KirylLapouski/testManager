import constants from '../constants'
import axios from 'axios'

const updateLoggedInUserById = userId => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({ data }) => {
                dispatch({
                    type: constants.users.LOG_IN_USER,
                    payload: {
                        ...data
                    }
                })
            })
    }
}

const logout = () => {
    return dispatch => {
        return new Promise(resolve => {
            dispatch({
                type: constants.users.LOG_OUT
            })
            resolve()
        })
    }
}
const addUser = (email, password, userName) => {
    return dispatch => {
        return axios.post('http://localhost:3000/api/Participants', {
            email,
            password,
            username: userName
        })
            .then(({ data: user }) => {
                return axios.get(`http://localhost:3000/api/Participants/${user.id}`)
            })
            .then(({ data: user }) => {
                dispatch({
                    type: constants.users.ADD_USER,
                    payload: user
                })
                return user
            })

    }
}
const addUserAndLogIn = (email, password, userName) => {
    return dispatch => {
        return addUser(email, password, userName)(dispatch)
            .then(() => {
                return loginUser(email, password)(dispatch)
            }, (err) => {
                // TODO: this error will be rewriten by second reject handler
                throw new Error('Ошибка добавления нового пользователя')
            })
    }
}

const loginUser = (email, password) => {
    return dispatch => {
        return axios.post('http://localhost:3000/api/Participants/login', { email, password }, { timeout: 10000 })
            .then(({ data }) => {
                const loopbackToken = data.id
                const loopbackTokenExpireIn = (new Date(data.ttl * 1000 + Date.now())).toDateString()

                return axios.patch(`http://localhost:3000/api/Participants/${data.userId}`, { loopbackToken, loopbackTokenExpireIn })
            })
            .then(({ data }) => {
                dispatch({
                    type: constants.users.LOG_IN_USER,
                    payload: {
                        ...data
                    }
                })
                return data
            })
    }
}
const submitQuestionResult = (userId, questionId, isRightAnswered) => {
    return dispatch => {
        axios
            .get(
                `http://localhost:3000/api/UserQuestions?filter=%7B%22where%22%3A%7B%22participantId%22%3A${userId}%2C%22questionId%22%3A${questionId}%7D%7D`
            )
            .then(({ data }) => {
                if (data.length === 0)
                    return axios.post(
                        'http://localhost:3000/api/UserQuestions',
                        {
                            isRightAnswered,
                            participantId: userId,
                            questionId
                        }
                    )
                else
                    return axios.patch(
                        `http://localhost:3000/api/UserQuestions/${data[0].id}`,
                        {
                            isRightAnswered,
                            participantId: userId,
                            questionId
                        }
                    )
            })
            .then(({ data }) => {
                if (data.isRightAnswered) {
                    dispatch({
                        type:
                            constants.users
                                .ADD_RIGHT_ANSWERED_QUESTION_FOR_LOGGED_IN,
                        payload: data
                    })
                } else {
                    dispatch({
                        type:
                            constants.users
                                .ADD_WRONG_ANSWERED_QUESTION_FOR_LOGGED_IN,
                        payload: data
                    })
                }
            })
            .then(() => {
                return axios.get(
                    `http://localhost:3000/api/Participants/${userId}/questions`
                )
            })
            .then(({ data }) => {
                dispatch({
                    type:
                        constants.users
                            .SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER,
                    payload: {
                        questions: data
                    }
                })
            })
    }
}

// const returnRightAnsweredQuestions = (userId, lessonId) => {

// }
// TODO: bear addImageToUser and addFileToUser in module
const addImageToUser = (userId, form, yandexUser = false) => {
    return dispatch => {
        return addFileToUser(userId, form, yandexUser)(dispatch)
            .then(file =>
                axios.patch(`http://localhost:3000/${userId}/setAvatar`, file)
                    .then(() => updateLoggedInUserById(userId)(dispatch))
            )
    }
}

const addFileToUser = (userId, form, yandexUser = false) => {
    return dispatch => {
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
}
const getUserById = userId => {
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Participants/${userId}`)
            .then(({ data }) => {
                dispatch({
                    type: constants.users.ADD_USER,
                    payload: {
                        ...data
                    }
                })
                return data
            })
    }
}

const attachUserToCource = (userId, secretWord) => {
    //it is not AC it just query to back
    return dispatch => {
        return axios
            .get(
                `http://localhost:3000/api/Disciplines?filter=%7B%22where%22%3A%7B%22secretWord%22%3A%22${secretWord}%22%7D%7D`
            )
            .then(({ data }) => {
                if (typeof data[0] === 'undefined')
                    throw new Error('Такого курса не существует')

                dispatch({
                    type: constants.courses.ADD_COURSE,
                    payload: {
                        ...data[0]
                    }
                })
                return axios.post(
                    'http://localhost:3000/api/ParticipantDisciplineMappings',
                    {
                        type: 'student',
                        participantId: userId,
                        disciplineId: data[0].id
                    }
                )
            })
    }
}

const untieUserFromCourseAndDeleteCourse = (userId, courseId) => {
    return dispatch => {
        axios
            .get(
                `http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22participantId%22%3A%22${userId}%22%2C%22disciplineId%22%3A%22${courseId}%22%7D%7D`
            )
            .then(({ data }) => {
                return axios.delete(
                    `http://localhost:3000/api/ParticipantDisciplineMappings/${
                        data[0].id
                    }`
                )
            })
            .then(({ data }) => {
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
        axios
            .get(
                `http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22participantId%22%3A${userId}%2C%22disciplineId%22%3A${courseId}%7D%7D`
            )
            .then(({ data }) => {
                if (data.length > 0) {
                    axios
                        .delete(
                            `http://localhost:3000/api/ParticipantDisciplineMappings/${
                                data[0].id
                            }`
                        )
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
//If user did not answer on this lesson quesrions return UNDEFINED
const getUserTestsResultsForLesson = (lessonId, userId) => {
    //TODO: now only for logged in. Is it true ?
    // let questionsInlessonRaw
    let questionsInlesson, questionsInlessonWithResults
    return dispatch => {
        return axios
            .get(`http://localhost:3000/api/Lessons/${lessonId}/topics/`)
            .then(({ data: topics }) => {
                return Promise.all(
                    topics.map(value => {
                        return axios.get(
                            `http://localhost:3000/api/Topics/${
                                value.id
                            }/questions`
                        )
                    })
                )
            })
            .then(questionsInlessonRaw => {
                questionsInlesson = questionsInlessonRaw.reduce(
                    (accumulator, { data: value }) => accumulator.concat(value),
                    []
                )
                return Promise.all(
                    questionsInlesson.map(value =>
                        axios.get(
                            `http://localhost:3000/api/UserQuestions?filter=%7B%22where%22%3A%7B%20%22participantId%22%3A${userId}%2C%20%22questionId%22%3A${
                                value.id
                            }%7D%7D`
                        )
                    )
                )
            })
            .then(questions => {
                questionsInlessonWithResults = questions
                    .map(value => value.data[0])
                    .filter(value => !!value)

                let questionResults = questionsInlesson
                    .map(question => {
                        let position = questionsInlessonWithResults
                            .map(value => (value ? value.questionId : 0))
                            .indexOf(question.id)
                        if (position >= 0) {
                            return {
                                ...question,
                                isRightAnswered:
                                    questionsInlessonWithResults[position]
                                        .isRightAnswered
                            }
                        }
                    })
                    .filter(val => !!val)

                dispatch({
                    type:
                        constants.users
                            .SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER,
                    payload: {
                        questions: questionResults
                    }
                })
                return questionResults
            })

        // let userAnswers = await Promise.all(questionsInlesson.map(value => {
        //     return axios.get(`http://localhost:3000/api/UserQuestions?filter=%7B%22where%22%3A%7B%22participantId%22%3A${userId}%2C%20%22questionId%22%3A${value.id}%7D%7D`)
        // }))
        // console.log(userAnswers.reduce((accumulator, { data }) => accumulator.concat(data), []))
    }
}

const getUsersInDiscipline = disciplineId => {
    return dispatch => {
        axios
            .get(
                `http://localhost:3000/api/ParticipantDisciplineMappings?filter=%7B%22where%22%3A%7B%22disciplineId%22%3A${disciplineId}%7D%7D`
            )
            .then(({ data }) => {
                return Promise.all(
                    data.map(value => {
                        return axios.get(
                            `http://localhost:3000/api/Participants/${
                                value.participantId
                            }`
                        )
                    })
                )
            })
            .then(values => {
                dispatch({
                    type: constants.users.ADD_USERS,
                    payload: {
                        users: values
                            .map(value => value.data)
                            .filter(value => value.type !== 'teacher')
                    }
                })
            })
    }
}
const deleteUser = userId => {
    return dispatch => {
        return axios.delete(`http://localhost:3000/api/Participants/${userId}`)
            .then(({ data: count }) => {
                if (!count.count)
                    throw new Error(`Ошибка удаления: пользователя с id ${userId} не существует`)

                dispatch({
                    type: constants.users.DELETE_USER,
                    payload: {
                        userId
                    }
                })
            })
    }
}

export {
    updateLoggedInUserById,
    logout,
    addUser,
    addUserAndLogIn,
    loginUser,
    deleteUser,
    submitQuestionResult,
    addImageToUser,
    getUserById,
    attachUserToCource,
    untieUserFromCourseAndDeleteCourse,
    untieUserFromCourse,
    addFileToUser,
    getUserTestsResultsForLesson,
    getUsersInDiscipline
}

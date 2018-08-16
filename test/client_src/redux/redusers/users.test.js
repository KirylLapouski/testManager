let constants = require('../../../../client_src/src/redux/constants').default
let userReducer = require('../../../../client_src/src/redux/redusers/users').default
let reducerTest = require('./reducerTest')(userReducer)
let initStore = {
    loggedIn: {
        email: "lapkovskyk@mail.ru",
        emailVerified: null,
        firstName: null,
        id: 1,
        imageUrl: null,
        loopbackToken: "KQFjsYyHw4bQekuCWFmWDWy6uvpmBwOGwlb330Yt0ud62o6SksCggWPGJ6mFCzxX",
        loopbackTokenExpireIn: "Sat Jul 21 2018",
        realm: null,
        secondName: null,
        username: "kirill",
        yandexRefreshToken: null,
        yandexToken: null,
        yandexTokenExpireIn: null,
    }
}
describe('user reducer', function () {
    describe('ADD_LOGGED_IN_USER', function () {
        it('add one loggedIn user in empty store', function () {
            let store = {}
            let action = {
                type: constants.users.ADD_LOGGED_IN_USER,
                payload: {
                    email: "lapkovskyk@mail.ru",
                    emailVerified: null,
                    firstName: null,
                    id: 1,
                    imageUrl: null,
                    loopbackToken: "KQFjsYyHw4bQekuCWFmWDWy6uvpmBwOGwlb330Yt0ud62o6SksCggWPGJ6mFCzxX",
                    loopbackTokenExpireIn: "Sat Jul 21 2018",
                    realm: null,
                    secondName: null,
                    username: "kirill",
                    yandexRefreshToken: null,
                    yandexToken: null,
                    yandexTokenExpireIn: null,
                }
            }
            let expectedResult = {
                loggedIn: {
                    email: "lapkovskyk@mail.ru",
                    emailVerified: null,
                    firstName: null,
                    id: 1,
                    imageUrl: null,
                    loopbackToken: "KQFjsYyHw4bQekuCWFmWDWy6uvpmBwOGwlb330Yt0ud62o6SksCggWPGJ6mFCzxX",
                    loopbackTokenExpireIn: "Sat Jul 21 2018",
                    realm: null,
                    secondName: null,
                    username: "kirill",
                    yandexRefreshToken: null,
                    yandexToken: null,
                    yandexTokenExpireIn: null,
                }
            }
            reducerTest(store, action, expectedResult)
        })

    })
    describe('SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER', function () {
        it('submit result of 3 question for logged in user with empty results of question prop', function () {
            const store = initStore
            const action = {
                type: constants.users.SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER,
                payload: {
                    questions: [
                        {
                            description: "",
                            id: 1,
                            title: "New Question 1",
                            topicId: 1,
                            weight: 1,

                        },
                        {
                            description: "",
                            id: 4,
                            title: "Question 22",
                            topicId: 2,
                            weight: 1
                        },
                        {
                            description: "",
                            id: 3,
                            title: "Question 21",
                            topicId: 2,
                            weight: 1,
                        }
                    ]
                }
            }

            const expectedResult = {
                loggedIn: {
                    answeredQuestions: [1, 3, 4],
                    email: "lapkovskyk@mail.ru",
                    emailVerified: null,
                    firstName: null,
                    id: 1,
                    imageUrl: null,
                    loopbackToken: "KQFjsYyHw4bQekuCWFmWDWy6uvpmBwOGwlb330Yt0ud62o6SksCggWPGJ6mFCzxX",
                    loopbackTokenExpireIn: "Sat Jul 21 2018",
                    realm: null,
                    rightAnswered: [],
                    secondName: null,
                    username: "kirill",
                    yandexRefreshToken: null,
                    yandexToken: null,
                    yandexTokenExpireIn: null,
                }
            }
            reducerTest(store, action, expectedResult)
        })

        it('submit result of 3 question for logged in user with NOT empty results of question prop (should merge)', function () {
            const store = {
                loggedIn: {
                    ...initStore.loggedIn,
                    ... {
                        answeredQuestions: Object.assign([], initStore.loggedIn.answeredQuestions, [1, 3])
                    }
                }
            }
            // const store = Object.assign({}, initStore, {
            //     loggedIn: {
            //         answeredQuestions: Object.assign([], initStore.loggedIn.answeredQuestions, [1, 3])
            //     }
            // })
            const action = {
                type: constants.users.SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER,
                payload: {
                    questions: [
                        {
                            description: "",
                            id: 2,
                            title: "Question 2",
                            topicId: 2,
                            weight: 1,
                        }
                    ]
                }
            }
            const expectedResult = {
                loggedIn: {
                    answeredQuestions: [1, 2, 3],
                    email: "lapkovskyk@mail.ru",
                    emailVerified: null,
                    firstName: null,
                    id: 1,
                    imageUrl: null,
                    loopbackToken: "KQFjsYyHw4bQekuCWFmWDWy6uvpmBwOGwlb330Yt0ud62o6SksCggWPGJ6mFCzxX",
                    loopbackTokenExpireIn: "Sat Jul 21 2018",
                    realm: null,
                    rightAnswered: [],
                    secondName: null,
                    username: "kirill",
                    yandexRefreshToken: null,
                    yandexToken: null,
                    yandexTokenExpireIn: null,
                }
            }
            reducerTest(store, action, expectedResult)
        })
    })
    describe('ADD_USER', function () {
        it('add one user in empty store', function () {
            const store = {}
            const action = {
                type: constants.users.ADD_USER,
                payload: {
                    yandexToken: null,
                    yandexRefreshToken: null,
                    yandexTokenExpireIn: null,
                    loopbackToken: "l7eAGXEBK0vMv7vyYY3P5hXvqflHt8PPgwLixL0fPvh1sXDlU3TAkEVRBppnD32E",
                    loopbackTokenExpireIn: "Sat Jul 21 2018",
                    imageUrl: null,
                    firstName: null,
                    secondName: null,
                    realm: null,
                    username: "kirill",
                    email: "lapkovskyk@mail.ru",
                    emailVerified: null,
                    id: 1
                }
            }
            const expextedResult = {
                1: {
                    yandexToken: null,
                    yandexRefreshToken: null,
                    yandexTokenExpireIn: null,
                    loopbackToken: "l7eAGXEBK0vMv7vyYY3P5hXvqflHt8PPgwLixL0fPvh1sXDlU3TAkEVRBppnD32E",
                    loopbackTokenExpireIn: "Sat Jul 21 2018",
                    imageUrl: null,
                    firstName: null,
                    secondName: null,
                    realm: null,
                    username: "kirill",
                    email: "lapkovskyk@mail.ru",
                    emailVerified: null,
                    id: 1
                }
            }

            reducerTest(store, action, expextedResult)
        })
    })
    describe('ADD_RIGHT_ANSWERED_QUESTION_FOR_LOGGED_IN', function () {
        it('TODO')
    })
    describe('ADD_WRONG_ANSWERED_QUESTION_FOR_LOGGED_IN', function () {
        it('TODO')
    })
    describe('ADD USERS', function () {
        it('TODO')
    })
})

var constants = require('../../../../client_src/src/redux/constants').default
var userReducer = require('../../../../client_src/src/redux/redusers/users').default
var reducerTest = require('./reducerTest')(userReducer)
var initStore = {
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
            var store = {}
            var action = {
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
            var expectedResult = {
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

        it('add logged in user twice (should merge)')
    })
    describe('SUBMIT_RESULT_OF_QUESTIONS_FOR_LOGGEDIN_USER', function () {
        it('submit result of 3 question for logged in user', function () {
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
                    answeredQuestions: [1, 4, 3],
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
})

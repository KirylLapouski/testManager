let constants = require('../../../../client_src/src/redux/constants').default
let topicReducer = require('../../../../client_src/src/redux/redusers/topics').default
let reducerTest = require('./reducerTest')(topicReducer)

const initState = {
    1: {
        id: 1,
        lessonId: 9,
        path: "html html",
        title: "topic 1"
    },
    2: {
        id: 2,
        lessonId: 9,
        path: "html html",
        title: "topic 1"
    }
}
describe('topic reducer', function () {
    describe('ADD_TOPIC', function () {
        it('add topic in empty store', function () {
            const store = {}
            const action = {
                type: constants.topics.ADD_TOPIC,
                payload: {
                    id: 1,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                }
            }
            const expectedResult = {
                1: {
                    id: 1,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                }
            }

            reducerTest(store, action, expectedResult)
        })

        it('add topic to state with other topics', function () {
            const store = initState
            const action = {
                type: constants.topics.ADD_TOPIC,
                payload: {
                    id: 3,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 3"
                }
            }
            const expectedResult = {
                1: {
                    id: 1,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                },
                2: {
                    id: 2,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"

                },
                3: {
                    id: 3,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 3"
                }
            }
            reducerTest(store, action, expectedResult)

        })
    })
    describe('ADD_TOPICS', function () {
        it('add topics to empty store', function () {
            const store = {}
            const action = {
                type: constants.topics.ADD_TOPICS,
                payload: [{
                    id: 3,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 3"
                },
                {
                    id: 4,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 4"
                },
                ]
            }
            const expectedResult = {
                3: {
                    id: 3,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 3"
                },
                4: {
                    id: 4,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 4"
                }
            }

            reducerTest(store, action, expectedResult)
        })

        it('add topics to store with different topics', function () {
            const store = initState
            const action = {
                type: constants.topics.ADD_TOPICS,
                payload: [{
                    id: 3,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 3"
                },
                {
                    id: 4,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 4"
                }]
            }

            const expectedResult = {
                1: {
                    id: 1,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                },
                2: {
                    id: 2,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                },
                3: {
                    id: 3,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 3"
                },
                4: {
                    id: 4,
                    lessonId: 9,
                    path: 'html html',
                    title: "topic 4"
                }
            }
            reducerTest(store, action, expectedResult)
        })
        it('do not rewrite previous state')
    })

    describe('UPDATE_TOPIC', function () {
        it('update one topic', function () {
            const store = initState
            const action = {
                type: constants.topics.UPDATE_TOPIC,
                payload: {
                    id: 2,
                    lessonId: 9,
                    path: "newhtml newhtml",
                    title: "topic 1"
                }
            }

            const expectedResult = {
                1: {
                    id: 1,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                },
                2: {
                    id: 2,
                    lessonId: 9,
                    path: "newhtml newhtml",
                    title: "topic 1"
                }
            }
            reducerTest(store, action, expectedResult)
        })
    })
    describe('ADD_TOPIC_QUESTIONS', function () {
        it('add one question to topic', function () {
            const store = initState
            const action = {
                type: constants.topics.ADD_TOPIC_QUESTIONS,
                payload: {
                    questions: [
                        {
                            title: "New Question 1",
                            description: "",
                            weight: 1,
                            id: 1,
                            topicId: 1
                        }],
                    topicId: 1
                }
            }
            const expectedResult = {
                1: {
                    id: 1,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1",
                    questions: [1]
                },
                2: {
                    id: 2,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                }
            }
            reducerTest(store, action, expectedResult)
        })
    })

    describe('DELETE_TOPIC', function () {
        it('delete topic in empty store(silently ends)', function () {
            //TODO: this test works when reducer appropriate does not exists
            const store = {}
            const action = {
                type: constants.topics.DELETE_TOPIC,
                payload: {
                    id: 1
                }
            }
            const expectedResult = {}

            reducerTest(store, action, expectedResult)
        })

        it('delete topic in NOT empty store', function () {

            const store = initState
            const action = {
                type: constants.topics.DELETE_TOPIC,
                payload: {
                    id: 1
                }
            }
            const expectedResult = {
                2: {
                    id: 2,
                    lessonId: 9,
                    path: "html html",
                    title: "topic 1"
                }
            }

            reducerTest(store, action, expectedResult)
        })
    })
})

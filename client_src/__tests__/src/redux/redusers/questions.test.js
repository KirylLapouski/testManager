import questionReducer from '../../../../src/redux/redusers/questions'
import constants from '../../../../src/redux/constants'
import reducerTestDefault from './reducerTest'
const reducerTest = reducerTestDefault(questionReducer)
const initState = {
    1: {
        id: 1,
        title: 'title1',
        description: 'description1',
        weight: 1,
        topicId: 1
    },
    2: {
        id: 2,
        title: 'title2',
        description: 'description2',
        weight: 1,
        topicId: 1
    }
}
describe('question reducer', function () {
    describe('ADD_QUESTION', function () {
        it('add question in empty store', function () {
            const state = {}
            const action = {
                type: constants.questions.ADD_QUESTION,
                payload: {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    weight: 1,
                    topicId: 1
                }
            }

            const expextedResult = {
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    weight: 1,
                    topicId: 1
                }
            }
            reducerTest(state, action, expextedResult)
        })

        it('add question in store with different questions', function () {
            const state = initState
            const action = {
                type: constants.questions.ADD_QUESTION,
                payload: {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    weight: 1,
                    topicId: 1
                }
            }

            const expextedResult = {
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    weight: 1,
                    topicId: 1
                },
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    weight: 1,
                    topicId: 1
                },
                3: {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    weight: 1,
                    topicId: 1
                }
            }
            reducerTest(state, action, expextedResult)
        })
    })
    describe('ADD_QUESTIONS', function () {
        it('add questions in empty store', function () {
            const state = {}
            const action = {
                type: constants.questions.ADD_QUESTIONS,
                payload: [{
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    weight: 1,
                    topicId: 1
                },
                {
                    id: 4,
                    title: 'title4',
                    description: 'description4',
                    weight: 1,
                    topicId: 1
                }]
            }

            const expextedResult = {
                3: {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    weight: 1,
                    topicId: 1
                },
                4: {
                    id: 4,
                    title: 'title4',
                    description: 'description4',
                    weight: 1,
                    topicId: 1
                }
            }
            reducerTest(state, action, expextedResult)
        })

        it('add questions in store with different questions', function () {
            const state = initState
            const action = {
                type: constants.questions.ADD_QUESTIONS,
                payload: [{
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    weight: 1,
                    topicId: 1
                },
                {
                    id: 4,
                    title: 'title4',
                    description: 'description4',
                    weight: 1,
                    topicId: 1
                }]
            }

            const expextedResult = {
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1',
                    weight: 1,
                    topicId: 1
                },
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    weight: 1,
                    topicId: 1
                },
                3: {
                    id: 3,
                    title: 'title3',
                    description: 'description3',
                    weight: 1,
                    topicId: 1
                },
                4: {
                    id: 4,
                    title: 'title4',
                    description: 'description4',
                    weight: 1,
                    topicId: 1
                }
            }
            reducerTest(state, action, expextedResult)
        })
    })
    describe('DELETE_QUESTION', function () {
        it('delete one question in store', function () {
            const state = initState
            const action = {
                type: constants.questions.DELETE_QUESTION,
                payload: {
                    questionId: 1
                }
            }

            const expextedResult = {
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    weight: 1,
                    topicId: 1
                }
            }

            reducerTest(state, action, expextedResult)
        })
    })
    describe('UPDATE_QUESTION', function () {
        it('update one question in state', function () {
            const state = initState
            const action = {
                type: constants.questions.UPDATE_QUESTION,
                payload: {
                    id: 1,
                    title: 'new title',
                    description: 'description1',
                    weight: 1,
                    topicId: 1
                }
            }
            const expextedResult = {
                1: {
                    id: 1,
                    title: 'new title',
                    description: 'description1',
                    weight: 1,
                    topicId: 1
                },
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2',
                    weight: 1,
                    topicId: 1
                }
            }

            reducerTest(state, action, expextedResult)
        })
    })
})

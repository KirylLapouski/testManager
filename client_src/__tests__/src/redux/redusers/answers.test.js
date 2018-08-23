import constants from '../../../../src/redux/constants'
import answersReducer from '../../../../src/redux/redusers/answers'
import reducerTestDefault from './reducerTest'
const reducerTest = reducerTestDefault(answersReducer)
const initState = {
    1: {
        id: 1,
        title: 'title1',
        description: 'description1'
    },
    2: {
        id: 2,
        title: 'title2',
        description: 'description2'
    }
}

describe('answer reducer', function () {
    describe('ADD_ANSWER', function () {
        it('add answer in empty state', function () {
            const state = {}
            const action = {
                type: constants.answers.ADD_ANSWER,
                payload: {
                    id: 0,
                    titile: 'title',
                    description: 'description'
                }
            }

            const expected = {
                0: {
                    id: 0,
                    titile: 'title',
                    description: 'description'
                }
            }
            reducerTest(state, action, expected)
        })

        it('add answer in store with different answers', function () {
            const state = initState

            const action = {
                type: constants.answers.ADD_ANSWER,
                payload: {
                    id: 3,
                    title: 'title3',
                    description: 'description3'
                }
            }

            const expected = {
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1'
                },
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2'
                },
                3: {
                    id: 3,
                    title: 'title3',
                    description: 'description3'
                }
            }

            reducerTest(state, action, expected)
        })
    })

    describe('ADD_ANSWERS', function () {
        it('add answers in empty state', function () {
            const state = {}
            const action = {
                type: constants.answers.ADD_ANSWERS,
                payload: [{
                    id: 0,
                    title: 'title0',
                    description: 'description0'
                }, {
                    id: 1,
                    title: 'title1',
                    description: 'description1'
                }]
            }
            const expected = {
                0: {
                    id: 0,
                    title: 'title0',
                    description: 'description0'
                },
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1'
                }
            }

            reducerTest(state, action, expected)
        })
        it('add answers in store with different answers', function () {
            const state = initState
            const action = {
                type: constants.answers.ADD_ANSWERS,
                payload: [{
                    id: 3,
                    title: 'title3',
                    description: 'description3'
                }, {
                    id: 4,
                    title: 'title4',
                    description: 'description4'
                }]
            }
            const expected = {
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1'
                },
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2'
                },
                3: {
                    id: 3,
                    title: 'title3',
                    description: 'description3'
                },
                4: {
                    id: 4,
                    title: 'title4',
                    description: 'description4'
                }
            }

            reducerTest(state, action, expected)
        })
    })
    describe('DELETE_ANSWER', function () {
        it('delete one answer in state', function () {
            const state = initState
            const action = {
                type: constants.answers.DELETE_ANSWER,
                payload: {
                    answerId: 1
                }
            }
            const expected = {
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2'
                }
            }

            reducerTest(state, action, expected)
        })
    })
    describe('UPDATE_ANSWER', function () {
        it('update one answer in state', function () {
            const state = initState
            const action = {
                type: constants.answers.UPDATE_ANSWER,
                payload: {
                    id: 4,
                    title: 'title4',
                    description: 'description4'
                }
            }

            const expected = {
                1: {
                    id: 1,
                    title: 'title1',
                    description: 'description1'
                },
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2'
                },
                4: {
                    id: 4,
                    title: 'title4',
                    description: 'description4'
                }
            }
            reducerTest(state, action, expected)
        })
    })
})

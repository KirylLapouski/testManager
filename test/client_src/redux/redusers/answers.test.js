let assert = require('assert')
let deepFreeze = require('deep-freeze')
let constants = require('../../../../client_src/src/redux/constants').default
let answersReducer = require('../../../../client_src/src/redux/redusers/answers').default
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

            deepFreeze(state)
            deepFreeze(action)
            assert.deepEqual(answersReducer(state, action), {
                0: {
                    id: 0,
                    titile: 'title',
                    description: 'description'
                }
            })
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

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(answersReducer(state, action), {
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
            })
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

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(answersReducer(state, action), {
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
            })
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

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(answersReducer(state, action), {
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
            })
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

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(answersReducer(state, action), {
                2: {
                    id: 2,
                    title: 'title2',
                    description: 'description2'
                }
            })
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

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(answersReducer(state, action), {
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
            })
        })
    })
})

var assert = require('assert')
var deepFreeze = require('deep-freeze')
var constants = require('../../../../client_src/src/redux/constants').default
var answersReducer = require('../../../../client_src/src/redux/redusers/answers').default
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
            const state = {
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
        it('add answer in empty state')
        it('add answer in store with different answers')
    })
    describe('DELETE_ANSWER', function () {
        it('add answer in empty state')
        it('add answer in store with different answers')
    })
    describe('UPDATE_ANSWER', function () {
        it('add answer in empty state')
        it('add answer in store with different answers')
    })
})

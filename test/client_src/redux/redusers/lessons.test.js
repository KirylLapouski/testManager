var assert = require('assert')
var lessonReducer = require('../../../../client_src/src/redux/redusers/lessons').default
var constance = require('../../../../client_src/src/redux/constants').default
var deepFreeze = require('deep-freeze')
var reducerTest = require('./reducerTest')(lessonReducer)
const initState = {
    1: {
        description: 'description 1',
        disciplineId: 1,
        id: 1,
        title: "title 1",
    },
    2: {
        description: 'description 2',
        disciplineId: 1,
        id: 2,
        title: "title 2",
    }
}

describe('lesson reducer', function () {
    describe('ADD_LESSON', function () {
        it('add lesson in empty state', function () {
            const state = {}
            const action = {
                type: constance.lessons.ADD_LESSON,
                payload: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: "title 1",
                }
            }

            reducerTest(state, action, {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: "title 1",
                }
            })
        })

        it('add lesson in store with different lessons', function () {
            const state = initState
            const action = {
                type: constance.lessons.ADD_LESSON,
                payload: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: "title 3",
                }
            }

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(lessonReducer(state, action), {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: "title 1",
                },
                2: {
                    description: 'description 2',
                    disciplineId: 1,
                    id: 2,
                    title: "title 2",
                },
                3: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: "title 3",
                }
            })
        })
    })
    describe('ADD_LESSONS', function () {
        it('add lessons in empty store', function () {
            const state = {}
            const action = {
                type: constance.lessons.ADD_LESSONS,
                payload: [
                    {
                        description: 'description 3',
                        disciplineId: 1,
                        id: 3,
                        title: "title 3",
                    },
                    {
                        description: 'description 4',
                        disciplineId: 1,
                        id: 4,
                        title: "title 4",
                    }
                ]
            }

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(lessonReducer(state, action), {
                3: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: "title 3",
                },
                4: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 4,
                    title: "title 4",
                }
            })
        })

        it('add lessons in store with differenr lessons', function () {
            const state = initState
            const action = {
                type: constance.lessons.ADD_LESSONS,
                payload: [
                    {
                        description: 'description 3',
                        disciplineId: 1,
                        id: 3,
                        title: "title 3",
                    },
                    {
                        description: 'description 4',
                        disciplineId: 1,
                        id: 4,
                        title: "title 4",
                    }
                ]
            }

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(lessonReducer(state, action), {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: "title 1",
                },
                2: {
                    description: 'description 2',
                    disciplineId: 1,
                    id: 2,
                    title: "title 2",
                },
                3: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: "title 3",
                },
                4: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 4,
                    title: "title 4",
                }
            })
        })
    })
    describe('DELETE_LESSON', function () {
        it('delete lesson from store', function () {
            const state = initState
            const action = {
                type: constance.lessons.DELETE_LESSON,
                payload: {
                    id: 1
                }
            }

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(lessonReducer(state, action), {
                2: {
                    description: 'description 2',
                    disciplineId: 1,
                    id: 2,
                    title: "title 2",
                }
            })

        })
    })
    describe('UPDATE_LESSON', function () {
        it('update one lesson in store', function () {
            const state = initState
            const action = {
                type: constance.lessons.UPDATE_LESSON,
                payload: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 2,
                    title: "title 4",
                }
            }

            deepFreeze(state)
            deepFreeze(action)

            assert.deepEqual(lessonReducer(state, action), {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: "title 1",
                },
                2: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 2,
                    title: "title 4",
                }
            })
        })
    })
})


import lessonReducer from '../../../../src/redux/redusers/lessons'
import constance from '../../../../src/redux/constants'
import reducerTestDefault from './reducerTest'
const reducerTest = reducerTestDefault(lessonReducer)
const initState = {
    1: {
        description: 'description 1',
        disciplineId: 1,
        id: 1,
        title: 'title 1',
    },
    2: {
        description: 'description 2',
        disciplineId: 1,
        id: 2,
        title: 'title 2',
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
                    title: 'title 1',
                }
            }
            const expected = {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: 'title 1',
                }
            }

            reducerTest(state, action,expected)
        })

        it('add lesson in store with different lessons', function () {
            const state = initState
            const action = {
                type: constance.lessons.ADD_LESSON,
                payload: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: 'title 3',
                }
            }

            const expected = {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: 'title 1',
                },
                2: {
                    description: 'description 2',
                    disciplineId: 1,
                    id: 2,
                    title: 'title 2',
                },
                3: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: 'title 3',
                }
            }

            reducerTest(state, action, expected)
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
                        title: 'title 3',
                    },
                    {
                        description: 'description 4',
                        disciplineId: 1,
                        id: 4,
                        title: 'title 4',
                    }
                ]
            }
            const expected =  {
                3: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: 'title 3',
                },
                4: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 4,
                    title: 'title 4',
                }
            }

            reducerTest(state,action,expected)
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
                        title: 'title 3',
                    },
                    {
                        description: 'description 4',
                        disciplineId: 1,
                        id: 4,
                        title: 'title 4',
                    }
                ]
            }

            const expected =  {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: 'title 1',
                },
                2: {
                    description: 'description 2',
                    disciplineId: 1,
                    id: 2,
                    title: 'title 2',
                },
                3: {
                    description: 'description 3',
                    disciplineId: 1,
                    id: 3,
                    title: 'title 3',
                },
                4: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 4,
                    title: 'title 4',
                }
            }

            reducerTest(state,action,expected)
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

            const expected =  {
                2: {
                    description: 'description 2',
                    disciplineId: 1,
                    id: 2,
                    title: 'title 2',
                }
            }

            reducerTest(state,action,expected)
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
                    title: 'title 4',
                }
            }

            const expected = {
                1: {
                    description: 'description 1',
                    disciplineId: 1,
                    id: 1,
                    title: 'title 1',
                },
                2: {
                    description: 'description 4',
                    disciplineId: 1,
                    id: 2,
                    title: 'title 4',
                }
            }

            reducerTest(state,action,expected)
        })
    })
})


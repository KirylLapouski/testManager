var constants = require('../../../../../client_src/src/redux/constants').default
var disciplineUserReducer = require('../../../../../client_src/src/redux/redusers/mapping/disciplineUser').default
var reducerTest = require('../reducerTest')(disciplineUserReducer)

const initState = {
    1: {
        disciplineId: 1,
        id: 1,
        participantId: 1,
        type: "teacher"
    },
    2: {
        disciplineId: 1,
        id: 2,
        participantId: 2,
        type: "student"
    }
}
describe('disciplineUser reducer', function () {
    describe(constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE, function () {
        it('add disciplineUser mapping in empty store', function () {
            const store = {}
            const action = {
                type: constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE,
                payload: {
                    disciplineUser: [{
                        disciplineId: 1,
                        id: 1,
                        participantId: 1,
                        type: "teacher",
                    }]
                }
            }
            const expextedResult = {
                1: {
                    disciplineId: 1,
                    id: 1,
                    participantId: 1,
                    type: "teacher",
                }
            }

            reducerTest(store, action, expextedResult)
        })

        it('add disciplineUser mapping in NOT empty store', function () {
            const store = initState
            const action = {
                type: constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE,
                payload: {
                    disciplineUser: [{
                        disciplineId: 2,
                        id: 3,
                        participantId: 3,
                        type: 'student',
                    }]
                }
            }
            const expextedResult = {
                1: {
                    disciplineId: 1,
                    id: 1,
                    participantId: 1,
                    type: "teacher"
                }, 2: {
                    disciplineId: 1,
                    id: 2,
                    participantId: 2,
                    type: "student"
                }, 3: {
                    disciplineId: 2,
                    id: 3,
                    participantId: 3,
                    type: 'student',
                }
            }

            reducerTest(store, action, expextedResult)
        })

        it('add SAME disciplineUser mapping in NOT empty store(should not dublicate)', function () {
            const store = initState
            const action = {
                type: constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE,
                payload: {
                    disciplineUser: [{
                        disciplineId: 1,
                        id: 1,
                        participantId: 1,
                        type: "teacher"
                    }]
                }
            }
            const expextedResult = {
                1: {
                    disciplineId: 1,
                    id: 1,
                    participantId: 1,
                    type: "teacher"
                }, 2: {
                    disciplineId: 1,
                    id: 2,
                    participantId: 2,
                    type: "student"
                }
            }

            reducerTest(store, action, expextedResult)
        })
    })
})

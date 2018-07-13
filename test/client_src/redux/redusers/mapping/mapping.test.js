var constants = require('../../../../../client_src/src/redux/constants').default
var mappingReducer = require('../../../../../client_src/src/redux/redusers/mapping/mapping').default
var reducerTest = require('../reducerTest')(mappingReducer)

describe('mapping reducer', function () {
    describe('userDiscipline reducer', function () {
        describe(constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE, function () {
            // it('add mapping in empty store', function () {
            //     const store = {}
            //     const action = {
            //         type: constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE,
            //         payload: [{
            //             disciplineId: 1,
            //             id: 1,
            //             participantId: 1,
            //             type: "teacher",
            //         }]
            //     }
            //     const expextedResult = {
            //         userDiscipline: [{
            //             disciplineId: 1,
            //             id: 1,
            //             participantId: 1,
            //             type: "teacher",
            //         }]
            //     }
            //     reducerTest(store, action, expextedResult)
            // })
        })
    })
})

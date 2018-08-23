import constants from '../../../../../src/redux/constants'
import mappingReducer from '../../../../../src/redux/redusers/mapping/mapping'
import reducerTestDefault from '../reducerTest'
const reducerTest = reducerTestDefault(mappingReducer)

describe('mapping reducer', function () {
    describe('userDiscipline reducer', function () {
        describe(constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE, function () {
            it.skip('add mapping in empty store', function () {
                const store = {}
                const action = {
                    type: constants.mapping.disciplineUser.ADD_USERS_FOR_COURSE,
                    payload: [{
                        disciplineId: 1,
                        id: 1,
                        participantId: 1,
                        type: 'teacher',
                    }]
                }
                const expextedResult = {
                    userDiscipline: [{
                        disciplineId: 1,
                        id: 1,
                        participantId: 1,
                        type: 'teacher',
                    }]
                }
                reducerTest(store, action, expextedResult)
            })
        })
    })
})

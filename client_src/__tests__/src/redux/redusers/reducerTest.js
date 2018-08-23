let deepFreeze = require('deep-freeze')
let assert = require('assert')

const reducerTest = (reducer) => (initState, action, expectedResult) => {
    const state = initState instanceof Array ? [...initState] : { ...initState }

    let newAction = { ...action }, realResult
    deepFreeze(state)
    deepFreeze(newAction)

    realResult = reducer(state, newAction)
    assert.deepEqual(realResult, expectedResult instanceof Array ? [...expectedResult] : { ...expectedResult })
}

module.exports = reducerTest

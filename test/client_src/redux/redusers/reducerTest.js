var deepFreeze = require('deep-freeze')
var assert = require('assert')

const reducerTest = (reducer) => (initState, action, expectedResult) => {
    const state = initState instanceof Array ? [...initState] : { ...initState }

    var newAction = { ...action }
    deepFreeze(state)
    deepFreeze(newAction)

    assert.deepEqual(reducer(state, newAction), expectedResult instanceof Array ? [...expectedResult] : { ...expectedResult })
}

module.exports = reducerTest

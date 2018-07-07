var deepFreeze = require('deep-freeze')
var assert = require('assert')

const reducerTest = (reducer) => (initState, action, expectedResult) => {
    const state = { ...initState }

    deepFreeze(state)
    deepFreeze({ ...action })

    assert.deepEqual(reducer(state, { ...action }), { ...expectedResult })
}

module.exports = reducerTest

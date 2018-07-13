var deepFreeze = require('deep-freeze')
var assert = require('assert')

const reducerTest = (reducer) => (initState, action, expectedResult) => {
    const state = initState instanceof Array ? [...initState] : { ...initState }

    deepFreeze(state)
    deepFreeze({ ...action })

    assert.deepEqual(reducer(state, { ...action }), expectedResult instanceof Array ? [...expectedResult] : { ...expectedResult })
}

module.exports = reducerTest

let deepFreeze = require('deep-freeze')
let assert = require('assert')

const reducerTest = (reducer) => (initState, action, expectedResult) => {
    const state = initState instanceof Array ? [...initState] : { ...initState }

    let newAction = { ...action }
    deepFreeze(state)
    deepFreeze(newAction)

    assert.deepEqual(reducer(state, newAction), expectedResult instanceof Array ? [...expectedResult] : { ...expectedResult })
}

module.exports = reducerTest

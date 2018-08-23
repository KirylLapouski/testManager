import store from '../../../../src/redux/store/index'
import {addAnswer} from '../../../../client_src/src/redux/AC/answers'

describe.skip('addAnswer', function () {

    beforeAll(() => {
        store.dispatch(addAnswer())
    })
})

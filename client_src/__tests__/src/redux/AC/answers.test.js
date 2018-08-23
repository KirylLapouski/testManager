import store from '../../../../src/redux/store/index'
import {addAnswer} from '../../../../client_src/src/redux/AC/answers'
import {}
describe.skip('addAnswer', function () {

    beforeAll(() => {
        // store.dispatch()
        store.dispatch(addAnswer(1,'check'))
    })
})

import store from '../../../../src/redux/store/index'
import {addCourse} from '../../../../src/redux/AC/courses'
import {addLoggedInUser} from '../../../../src/redux/AC/users'
describe('addCourse', ()=>{
    beforeAll(()=>{
        store.dispatch(addLoggedInUser())
        store.dispatch(addCourse())
    })
})

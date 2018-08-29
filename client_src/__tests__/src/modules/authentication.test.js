import store from '../../../src/redux/store/index'
import { login, signUpAndLogin } from "../../../src/modules/authentication";
import { addUser, deleteUser } from "../../../src/redux/AC/users";
import Cookies from 'universal-cookie'

const cookies = new Cookies()
console.log = () => { }
console.group = () => { }
describe('login', () => {
    let loginPromise
    beforeAll(() => {
        return loginPromise = addUser('checkcheck@checkch.ch', '1111', 'checkcheckcheck')(store.dispatch)
            .then(() => {
                return login('checkcheck@checkch.ch', '1111')
            })
            .then(user => user)
    })

    it('return promise', () => {
        expect(loginPromise instanceof Promise).toBe(true)
    })

    it('add loggedIn in state.users', () => {
        expect(store.getState().users.loggedIn).toBeDefined()
    })

    it('add loopback token in cookie', () => {
        expect(cookies.get('loopbackToken')).toBeDefined()
    })

    it('loopback token is a string 64 character length', () => {
        expect(typeof cookies.get('loopbackToken')).toBe('string')
        expect(cookies.get('loopbackToken').length).toBe(64)
    })

    afterAll(() => {
        return loginPromise.then(user => {
            return deleteUser(user.id)(store.dispatch)
        })
    })
})

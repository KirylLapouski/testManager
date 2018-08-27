import store from '../../../../src/redux/store/index'
import { logInUserById, logout, addUser, deleteUser } from '../../../../src/redux/AC/users'
// TODO: check than no trash data left in database and store after tests
// TODO: check that all are promises

// disable cosole.log and console.group
console.log = jest.fn()
console.group = jest.fn()

describe('logInUserById', () => {
    let createdUser;
    beforeEach(() => {
        return addUser('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then((user) => {
                createdUser = user
                return logInUserById(user.id)(store.dispatch)
            }, err => {
                console.error('Error when creating a user. ')
            })
    })

    it('should add prop loggedIn in store.users', () => {
        expect(store.getState().users.loggedIn).toBeDefined()
    })

    it('user id is same in store and in database', () => {
        expect(store.getState().users.loggedIn.id === createdUser.id).toBe(true)
    })

    it('should return resolved promise', () => {
        let createdUser
        return addUser('checkcheck@checkc.ch', '1111', 'checkcheckch')(store.dispatch)
            .then((user) => {
                createdUser=user
                expect(logInUserById(user.id)(store.dispatch)).resolve
                return logout()(store.dispatch)
            })
            .then(() => {
                return deleteUser(createdUser.id)(store.dispatch)
            })
    })
    afterEach(() => {
        return logout()(store.dispatch)
            .then(() => {
                return deleteUser(createdUser.id)(store.dispatch)
            })
    })
})

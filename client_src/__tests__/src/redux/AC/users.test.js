import store from '../../../../src/redux/store/index'
import { updateLoggedInUserById, logout, addUser, deleteUser, addUserAndLogIn, loginUser } from '../../../../src/redux/AC/users'
// TODO: check than no trash data left in database and store after tests
// TODO: check that all are promises

// disable cosole.log and console.group
console.log = jest.fn()
console.group = jest.fn()

describe('updateLoggedInUserById', () => {
    let createdUser;
    beforeEach(() => {
        return addUser('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then((user) => {
                createdUser = user
                return updateLoggedInUserById(user.id)(store.dispatch)
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

    // it('should return resolved promise', () => {
    //     let createdUser
    //     return addUser('checkcheck@checkc.ch', '1111', 'checkcheckch')(store.dispatch)
    //         .then((user) => {
    //             createdUser = user
    //             expect(updateLoggedInUserById(user.id)(store.dispatch)).resolve
    //             return logout()(store.dispatch)
    //         })
    //         .then(() => {
    //             return deleteUser(createdUser.id)(store.dispatch)
    //         })
    // })
    afterEach(() => {
        return logout()(store.dispatch)
            .then(() => {
                return deleteUser(createdUser.id)(store.dispatch)
            })
    })
})

describe('logout', () => {
    let createdUser;
    beforeAll(() => {
        return addUser('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then((user) => {
                createdUser = user

            }, err => {
                console.error('Error when creating a user. ')
            })
    })

    beforeEach(() => {
        return updateLoggedInUserById(createdUser.id)(store.dispatch)
    })

    it('should delete loggedIn from user in store', () => {
        return logout()(store.dispatch)
            .then(() => {
                expect(store.getState().users.loggedIn).not.toBeDefined()
            })
    })

    it('could logout as many times as you want', () => {
        return expect(() => {
            logout()(store.dispatch)
            logout()(store.dispatch)
            logout()(store.dispatch)
        }).not.toThrow()

    })
    afterEach(() => {
        return logout()(store.dispatch)
    })
    afterAll(() => {
        return deleteUser(createdUser.id)(store.dispatch)
    })
})

describe('addUser', () => {
    let createdUsers = []

    it('should add object in state.users', () => {
        return addUser('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then((user) => {
                createdUsers.push(user)
                expect(typeof store.getState().users[user.id]).toBe('object')
            })
    })

    it('key of props in state.users should be equal to user`s id', () => {
        return addUser('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then((user) => {
                createdUsers.push(user)
                expect(store.getState().users[user.id].id === user.id).toBe(true)
            })
    })
    afterEach(() => {
        // delete all users
        return Promise.all(createdUsers.map(user =>
            deleteUser(user.id)(store.dispatch)
        )).then(() => {
            createdUsers = []
        })
    })
})

describe('addUserAndLogIn', () => {
    let createdUser;
    beforeAll(() => {
        return addUserAndLogIn('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then(user =>
                createdUser = user
            )
    })
    it('should add loggedIn in state.users', () => {
        expect(store.getState().users.loggedIn).toBeDefined()
    })

    it('should add user object with key same as user`s id', () => {
        expect(store.getState().users[createdUser.id].id === createdUser.id).toBe(true)

    })

    it('logged in user`s id should match with created user id', () => {
        expect(store.getState().users.loggedIn.id === createdUser.id).toBe(true)
    })
    afterAll(() => {
        return deleteUser(createdUser.id)(store.dispatch)
    })
})

describe('loginUser', () => {
    let createdUser
    beforeAll(() => {
        return addUser('checkcheck@check.ch', '1111', 'checkcheck')(store.dispatch)
            .then((user) => {
                createdUser = user
                return loginUser('checkcheck@check.ch', '1111')(store.dispatch)
            })
    })

    it('should add loggedIN in state.users', () => {
        expect(typeof store.getState().users.loggedIn).toBe('object')
    })

    it('should add token to loggedIn user', () => {
        expect(typeof store.getState().users.loggedIn.loopbackToken).toBeDefined()
    })

    it('added loopback token is number-valid string', () => {
        expect(typeof +store.getState().users.loggedIn.loopbackToken).toBe('number')
    })

    it('added loopback token is 64-digit number', () => {
        expect(store.getState().users.loggedIn.loopbackToken.length).toBe(64)
    })

    it('add expired time for loopback token in prop loopbackTokenExpireIn', () => {
        expect(store.getState().users.loggedIn.loopbackTokenExpireIn).toBeDefined()
    })

    it('added expired time for loopback token is Data-valid string', () => {
        expect(Number.isNaN(Date.parse(store.getState().users.loggedIn.loopbackTokenExpireIn))).not.toBe(true)
    })
    afterAll(() => {
        return deleteUser(createdUser.id)(store.dispatch)
    })
})

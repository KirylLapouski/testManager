import store from '../../../../src/redux/store/index'
import { addCourse, deleteCourse } from '../../../../src/redux/AC/courses'
import { addUserAndLogIn, deleteUser } from '../../../../src/redux/AC/users'
// disable cosole.log and console.group
console.log = jest.fn()
console.group = jest.fn()

describe('addCourse', () => {
    let createdUser, createdCourse = {};
    beforeAll(() => {
        return addUserAndLogIn('addCourse@test.ru', '1111', 'addCourseTest')(store.dispatch)
            .then(user => {
                createdUser = user
                return addCourse(user.id, 'add Course unit test')(store.dispatch)
            })
            .then(course =>
                createdCourse = course
            )
    })

    it('should add a new course', () => {
        expect(store.getState().courses[createdCourse.id]).toBeDefined()
    })

    it('should contain secret word', () => {
        expect(typeof (store.getState().courses[createdCourse.id].secretWord)).toBe('string')
        expect(store.getState().courses[createdCourse.id].secretWord.length).toBe(5)
    })

    it('should contain owner user id', () => {
        expect(typeof (store.getState().courses[createdCourse.id].ownerId)).toBe('number')
    })

    it('owner user id should be equal to created user', () => {
        expect(store.getState().courses[createdCourse.id].ownerId === createdUser.id).toBe(true)
    })
    // delete created user and course
    afterAll(() => {
        return deleteUser(createdUser.id)(store.dispatch)
            .catch(() => {
                console.error(`Ошибка удаления пользователя, созданного в процессе теста.
                        Проверьте action creator и reducer, отвечающие за удаление пользователей.
                        Удалите следующий объект из базы данных:`, createdUser)
            })
            .then(() => {
                return deleteCourse(createdCourse.id)
            })
            .catch(() => {
                console.error(`Ошибка удаления круса, созданного в процессе теста.
            Проверьте action creator и reducer, отвечающие за удаление курса.
            Удалите следующий объект из базы данных:`, createdCourse)
            })
    })
})

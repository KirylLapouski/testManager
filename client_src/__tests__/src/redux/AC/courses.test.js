import store from '../../../../src/redux/store/index'
import { addCourse, deleteCourse, addCourseByLessonId, loadCoursesForUser } from '../../../../src/redux/AC/courses'
import { addLesson, deleteLesson } from '../../../../src/redux/AC/lessons'
import { addUserAndLogIn, deleteUser } from '../../../../src/redux/AC/users'
import constants from "../../../../src/redux/constants";
// disable cosole.log and console.group
console.log = jest.fn()
console.group = jest.fn()

describe('addCourse', () => {
    let createdUser, createdCourse
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
                return deleteCourse(createdCourse.id)(store.dispatch)
            })
            .catch(() => {
                console.error(`Ошибка удаления круса, созданного в процессе теста.
            Проверьте action creator и reducer, отвечающие за удаление курса.
            Удалите следующий объект из базы данных:`, createdCourse)
            })
    })
})

describe('addCourseByLessonId', () => {
    let createdUser, createdCourses, createdLessons
    beforeEach(() => {
        return addUserAndLogIn('addCourse@test.ru', '1111', 'addCourseTest')(store.dispatch)
            .then(user => {
                // create two courses
                createdUser = user

                return Promise.all([addCourse(user.id, 'add Course unit test')(store.dispatch),
                addCourse(user.id, 'add Course unit test2')(store.dispatch)])
            })
            .then(courses => {
                return createdCourses = courses
            }
            )
            .then(() => {
                // add 10 lesson to two courses (even-numbered to 0, and uneven to 1)

                let lessons = []
                for (let i = 0; i < 10; i++) {
                    lessons.push(addLesson(`check${i}`, createdCourses[Number(!!(i % 2))].id))
                }

                return Promise.all(lessons.map(lesson => lesson(store.dispatch)))
            })
            .then((lessons) => {
                createdLessons = lessons
            })

    })

    it('should add course to store if it does not exist', () => {
        return new Promise(resolve => {
            // delete 0's course
            store.dispatch({ type: constants.courses.DELETE_COURSE, payload: { courseId: createdCourses[0].id } })
            resolve()
        }
        )
            .then(() => {
                // determine course by every even-numbered lesson (should be 0's course)
                return Promise.all(createdLessons.filter(lesson => lesson.disciplineId === createdCourses[0].id).map(lesson => lesson.id).map(lessonId => addCourseByLessonId(lessonId)(store.dispatch)))
            })
            .then((courses) => {
                // TODO: check that all courses are the same course
                let value = courses.reduce((accumulator, value) => {
                    if (accumulator.id !== value.id)
                        return false
                    return accumulator
                }, courses[0])

                expect(store.getState().courses[createdCourses[0].id]).toBeDefined()
            })
    })

    it('get courses by a few lessons of the same course, and check that courses are same', () => {
        return new Promise(resolve => {
            // delete 0's course
            store.dispatch({ type: constants.courses.DELETE_COURSE, payload: { courseId: createdCourses[0].id } })
            resolve()
        })
            .then(() => {
                // determine course by every even-numbered lesson (should be 0's course)
                return Promise.all(createdLessons.filter(lesson => lesson.disciplineId === createdCourses[0].id).map(lesson => lesson.id).map(lessonId => addCourseByLessonId(lessonId)(store.dispatch)))
            })
            .then((courses) => {
                // TODO: check that all courses are the same course
                let value = courses.reduce((accumulator, value) => {
                    if (accumulator.id !== value.id)
                        return false
                    return accumulator
                }, courses[0])

                expect(typeof value).toBe('object')
            })

    })

    afterEach(() => {
        return deleteUser(createdUser.id)(store.dispatch)
            .catch(() => {
                console.error(`Ошибка удаления пользователя, созданного в процессе теста.
                        Проверьте action creator и reducer, отвечающие за удаление пользователей.
                        Удалите следующий объект из базы данных:`, createdUser)
            })
            .then(() => Promise.all(createdCourses.map(course => deleteCourse(course.id)(store.dispatch)))
            )
            .catch(() => {
                console.error(`Ошибка удаления курса, созданного в процессе теста.
            Проверьте action creator и reducer, отвечающие за удаление курса.
            Удалите следующий объект из базы данных:`, createdCourse)
            })
            .then(() =>
                Promise.all(createdLessons.map(lesson => deleteLesson(lesson.id)(store.dispatch)))
            )
            .catch(() => {
                console.error(`Ошибка удаления уроков, созданного в процессе теста.
            Проверьте action creator и reducer, отвечающие за удаление уроков.
            Удалите следующий объект из базы данных:`, createdLessons)
            })
    })
})


describe('loadCoursesForUser', () => {

    let createdUser, createdCourse

    beforeEach(() => {
        return addUserAndLogIn('addCourse@test.ru', '1111', 'addCourseTest')(store.dispatch)
            .then(user => {
                createdUser = user
                return addCourse(user.id, 'add Course unit test')(store.dispatch)
            })
            .then(course =>
                createdCourse = course
            )
    })

    it('should add new courses in store', () => {
        return new Promise(resolve => {
            store.dispatch({ type: constants.courses.DELETE_COURSE, payload: { courseId: createdCourse.id } })
            resolve()
        })
            .then(() => loadCoursesForUser(createdUser.id)(store.dispatch))
            .then((courses) => {
                courses.map(course => expect(store.getState().courses[course.id]).toBeDefined())
            })
    })

    it('should add user owner id to course',()=>{
        return new Promise(resolve => {
            store.dispatch({ type: constants.courses.DELETE_COURSE, payload: { courseId: createdCourse.id } })
            resolve()
        })
            .then(() => loadCoursesForUser(createdUser.id)(store.dispatch))
            .then((courses) => {
                courses.map(course => expect(typeof store.getState().courses[course.id].ownerId).toBe('number'))
            })
    })

    afterEach(() => {
        return deleteUser(createdUser.id)(store.dispatch)
            .catch(() => {
                console.error(`Ошибка удаления пользователя, созданного в процессе теста.
                        Проверьте action creator и reducer, отвечающие за удаление пользователей.
                        Удалите следующий объект из базы данных:`, createdUser)
            })
            .then(() => {
                return deleteCourse(createdCourse.id)(store.dispatch)
            })
            .catch(() => {
                console.error(`Ошибка удаления курса, созданного в процессе теста.
            Проверьте action creator и reducer, отвечающие за удаление курса.
            Удалите следующий объект из базы данных:`, createdCourse)
            })
    })
})

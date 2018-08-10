var assert = require("assert");
var courseReducer = require("../../../../client_src/src/redux/redusers/courses")
    .default;
var constants = require("../../../../client_src/src/redux/constants").default;
var deepFreeze = require("deep-freeze");
var reducerTest = require("./reducerTest")(courseReducer);
const initState = {
    1: {
        id: 1,
        title: "title1",
        ownerId: 0,
        secretWord: "very secret",
        backgroundUrl: "url url url"
    },
    2: {
        id: 2,
        title: "title2",
        ownerId: 0,
        secretWord: "very secret",
        backgroundUrl: "url url url"
    }
};

describe("course reducer", function() {
    describe("ADD_COURSE", function() {
        it("add course in empty state", function() {
            const state = {};
            const action = {
                type: constants.courses.ADD_COURSE,
                payload: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });
        it("add course in store with different course", function() {
            const state = initState;
            const action = {
                type: constants.courses.ADD_COURSE,
                payload: {
                    id: 3,
                    title: "title3",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                2: {
                    id: 2,
                    title: "title2",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                3: {
                    id: 3,
                    title: "title3",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });

        it("add course with id that already in store (should merge)", function() {
            const state = initState;
            const action = {
                type: constants.courses.ADD_COURSE,
                payload: {
                    id: 2,
                    title: "title3",
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            };

            const expectedState = {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                2: {
                    id: 2,
                    title: "title3",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            };
            reducerTest(state, action, expectedState);
        });
    });
    describe("ADD_COURSES", function() {
        it("add courses in empty state", function() {
            const state = {};
            const action = {
                type: constants.courses.ADD_COURSES,
                payload: [
                    {
                        id: 3,
                        title: "title3",
                        ownerId: 0,
                        secretWord: "very secret",
                        backgroundUrl: "url url url"
                    },
                    {
                        id: 4,
                        title: "title4",
                        ownerId: 0,
                        secretWord: "very secret",
                        backgroundUrl: "url url url"
                    }
                ]
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                3: {
                    id: 3,
                    title: "title3",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                4: {
                    id: 4,
                    title: "title4",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });
        it("add courses in store with different courses", function() {
            const state = initState;
            const action = {
                type: constants.courses.ADD_COURSES,
                payload: [
                    {
                        id: 3,
                        title: "title3",
                        ownerId: 0,
                        secretWord: "very secret",
                        backgroundUrl: "url url url"
                    },
                    {
                        id: 4,
                        title: "title4",
                        ownerId: 0,
                        secretWord: "very secret",
                        backgroundUrl: "url url url"
                    }
                ]
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                2: {
                    id: 2,
                    title: "title2",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                3: {
                    id: 3,
                    title: "title3",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                4: {
                    id: 4,
                    title: "title4",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });
    });
    describe("DELETE_COURSE", function() {
        it("delete one course in state", function() {
            const state = initState;
            const action = {
                type: constants.courses.DELETE_COURSE,
                payload: {
                    courseId: 2
                }
            };
            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });
    });
    describe("UPDATE_COURSE", function() {
        it("update one course in state", function() {
            const state = initState;
            const action = {
                type: constants.courses.UPDATE_COURSE,
                payload: {
                    id: 2,
                    title: "title4",
                    ownerId: 0,
                    secretWord: "very secret secret",
                    backgroundUrl: "url url url"
                }
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                2: {
                    id: 2,
                    title: "title4",
                    ownerId: 0,
                    secretWord: "very secret secret",
                    backgroundUrl: "url url url"
                }
            });
        });
    });

    describe("ADD_OWNER_TO_COURSE", function() {
        it("change owner in course", function() {
            const state = initState;
            const action = {
                type: constants.courses.ADD_OWNER_TO_COURSE,
                payload: {
                    courseId: 1,
                    ownerId: 5
                }
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 5,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                2: {
                    id: 2,
                    title: "title2",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });

        it("add owner to course", function() {
            const state = {
                ...initState,
                3: {
                    id: 3,
                    title: "title3",
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            };
            const action = {
                type: constants.courses.ADD_OWNER_TO_COURSE,
                payload: {
                    courseId: 3,
                    ownerId: 5
                }
            };

            deepFreeze(state);
            deepFreeze(action);

            assert.deepEqual(courseReducer(state, action), {
                1: {
                    id: 1,
                    title: "title1",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                2: {
                    id: 2,
                    title: "title2",
                    ownerId: 0,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                },
                3: {
                    id: 3,
                    title: "title3",
                    ownerId: 5,
                    secretWord: "very secret",
                    backgroundUrl: "url url url"
                }
            });
        });
    });
});

var assert = require('assert')
var parseTest = require('../test-parser')
describe('Test parser', function () {
    it('should return new question in JSON', function () {

        assert.deepEqual(parseTest(`question1?
        =rightAnswer11
        =rightAnswer21
        ~wrongAnswer1
        ~wrongAnswer1
        ~wrongAnswer1`), [{
            questionTitle: 'question1',
            answers: [{
                text: 'rightAnswer11',
                isRight: true
            },
            {
                text: 'rightAnswer21',
                isRight: true
            },
            {
                text: 'wrongAnswer1',
                isRight: false
            },
            {
                text: 'wrongAnswer1',
                isRight: false
            },
            {
                text: 'wrongAnswer1',
                isRight: false
            }
            ]
        }])
    })

    it('should return new questions in JSON', function () {

        assert.deepEqual(parseTest(`question1?
        =rightAnswer11
        =rightAnswer21
        ~wrongAnswer1
        ~wrongAnswer1
        ~wrongAnswer1

        question2?
        ~wrongAnswer
        ~wrongAnswer
        =rightAnswer`), [{
            questionTitle: 'question1',
            answers: [{
                text: 'rightAnswer11',
                isRight: true
            },
            {
                text: 'rightAnswer21',
                isRight: true
            },
            {
                text: 'wrongAnswer1',
                isRight: false
            },
            {
                text: 'wrongAnswer1',
                isRight: false
            },
            {
                text: 'wrongAnswer1',
                isRight: false
            }
            ]
        },
        {
            questionTitle: 'question2',
            answers: [{
                text: 'wrongAnswer',
                isRight: false
            },
            {
                text: 'wrongAnswer',
                isRight: false
            },
            {
                text: 'rightAnswer',
                isRight: true
            }
            ]
        }
        ])
    })

    it('throw error when there is no ? in question', function () {
        assert.throws(() => {
            parseTest(`question1
        =rightAnswer11
        =rightAnswer21
        ~wrongAnswer1
        ~wrongAnswer1
        ~wrongAnswer1`)
        }, function (err) {
            if (err.message === 'Знак ? не найден')
                return true
        })
    })

    it('throw error when no char = or char ~ before answer', function () {
        assert.throws(() => {
            parseTest(`question1?
            =rightAnswer11
            =rightAnswer21
            wrongAnswer1
            ~wrongAnswer1
            ~wrongAnswer1`)
        }, function (err) {
            if (err.message === 'Ни символ = ни символ ~ небыли найдены в ответе')
                return true
        })
    })
    //TODO: check error type
    it('throw error when find few ? char in one question', function () {
        assert.throws(() => {
            parseTest(`question1?dfsdfs?
            =rightAnswer11
            =rightAnswer21
            ~wrongAnswer1
            ~wrongAnswer1
            ~wrongAnswer1`)
        }, function (err) {
            if (err.message === 'Найдено несколько знаков ? в одном вопросе')
                return true
        })
    })

    it('throw error when no empty line between questions', function(){
        assert.throws(()=>{
            parseTest(`question1?
            =rightAnswer11
            =rightAnswer21
            ~wrongAnswer1
            ~wrongAnswer1
            ~wrongAnswer1
            question2?
            =rightAnswer11
            =rightAnswer21
            ~wrongAnswer1
            ~wrongAnswer1
            ~wrongAnswer1 `)
        }, function (err) {
            if (err.message === 'Найдено несколько знаков ? в одном вопросе')
                return true
        })
    })
})

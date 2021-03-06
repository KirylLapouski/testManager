module.exports = function(app) {
    let parseTest = require('../utils/test-parser')
    let router = app.loopback.Router()
    let fileUpload = require('express-fileupload')
    router.use(fileUpload())

    // function parseQuestion(question) {
    //     if (question.indexOf('?') === -1)
    //         throw new Error('Знак ? не найден')

    //     let [questionTitle, answers, ...extradata] = question.split('?\r\n')
    //     if (extradata.length)
    //         throw new Error('Найдено несколько знаков ? в одном вопросе')

    //     let answers = answers.split('\r\n')

    //     return {
    //         questionTitle,
    //         answers
    //     }
    // }

    // function saveQuestion(question, topicId, cb) {
    //     let Question = app.models.Question

    //     Question.create({
    //         title: question,
    //         weight: 1,
    //         topicId
    //     }, cb)
    // }
    // //TODO: pass cb and handle error
    // function saveAnswer(answer, questionId) {
    //     let Answer = app.models.Answer
    //     answer.replace(/\\r/g, '')
    //     if (answer.indexOf('=') === 0) {
    //         Answer.create({
    //             text: answer.substring(1),
    //             isRight: true,
    //             questionId
    //         })
    //         return
    //     }
    //     if (answer.indexOf('~') === 0) {
    //         Answer.create({
    //             text: answer.substring(1),
    //             isRight: false,
    //             questionId
    //         })
    //         return
    //     }
    //     if (answer.length === 0)
    //         return
    //     //TODO: правописание
    //     throw Error('Ни символ = ни символ ~ небыли найдены в ответе')
    // }
    function saveQuestion(question, topicId) {
        let Question = app.models.Question

        return new Promise((resolve, reject) => {
            Question.create(
                {
                    title: question,
                    weight: 1,
                    topicId
                },
                (err, resp) => {
                    if (err) reject(err)
                    resolve(resp)
                }
            )
        })
    }

    function saveAnswers(answers, questionId) {
        let Answer = app.models.Answer
        return answers.map(answer => {
            return new Promise((resolve, reject) => {
                Answer.create(
                    {
                        ...answer,
                        questionId,
                        typeOfAnswer: 'radio'
                    },
                    (err, newAnswer) => {
                        if (err) reject(err)
                        resolve(newAnswer)
                    }
                )
            })
        })
    }

    function saveTest(questions, topicId) {
        return questions.map(question => {
            return saveQuestion(question.questionTitle, topicId)
                .then(newQuestion => {
                    return Promise.all(
                        saveAnswers(question.answers, newQuestion.id)
                    )
                })
                .then(
                    (/*values*/) => {
                        //console.log(values)
                        //all answers for this question saved return question to check if all question saved
                        return question
                    },
                    err => {
                        //TODO: how test it?
                        console.error(err)
                        throw new Error('Ошибка при сохранении ответа')
                    }
                )
        })
    }
    router.post('/:topicId/parseQuestion', function(req, resp) {
        let dataStr = req.files.file.data.toString()
        try {
            let questions = parseTest(dataStr)
        } catch (e) {
            resp.status(400).send(e.message)
        }
        Promise.all(saveTest(questions, req.params.topicId)).then(
            (/*values*/) => {
                //all questions for this test saved
                // console.log(values)
                resp.sendStatus(201)
            },
            err => {
                //TODO: how test it?
                if (err.message === 'Ошибка при сохранении ответа')
                    resp.status(500).send(err.message)
                resp.status(500).send('Ошибка при сохранении вопросов')
            }
        )
    })

    app.use(router)
};

function parseTest(questions) {
    return questions.split('\n\n').map(question => {
        var {
            questionTitle,
            answers
        } = parseQuestion(question)
        answers = parseAnswers(answers)
        return {
            questionTitle,
            answers
        }
    })
}

function parseQuestion(question) {
    if (question.indexOf('?') === -1)
        throw new Error('Знак ? не найден')

    if(question.split('?').length >2)
        throw new Error('Найдено несколько знаков ? в одном вопросе')

    var [questionTitle, answers, ...extradata] = question.split('?')
    if (extradata.length)
        throw new Error('Найдено несколько знаков ? в одном вопросе')
    answers = answers.split('\n')
    return {
        questionTitle: questionTitle.trim(),
        answers
    }
}

function parseAnswers(answers) {
    return answers.map(element => {
        return parseAnswer(element)
    }).filter(value=>{
        return value
    })
}
//TODO: pass cb and handle error
function parseAnswer(answer) {
    answer.replace(/\\r/g, '')
    if(answer.length === 0)
        return

    if (answer.indexOf('=') !== -1) {
        return {
            text: answer.split('=')[1],
            isRight: true
        }
    }
    if (answer.indexOf('~') !== -1) {
        return {
            text: answer.split('~')[1],
            isRight: false
        }
    }
    if (answer.length === 0)
        return
    //TODO: правописание
    throw Error('Ни символ = ни символ ~ небыли найдены в ответе')
}

module.exports =  parseTest

// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-passport
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict'

var loopback = require('loopback')
var boot = require('loopback-boot')
var app = module.exports = loopback()
var cookieParser = require('cookie-parser')
var session = require('express-session')
// Passport configurators..
var loopbackPassport = require('loopback-component-passport')
var PassportConfigurator = loopbackPassport.PassportConfigurator
var passportConfigurator = new PassportConfigurator(app)
var fileUpload = require('express-fileupload')
/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser')

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash = require('express-flash')

// attempt to build the providers/passport config
var config = {}
try {
    config = require('../providers.json')
} catch (err) {
    console.trace(err)
    process.exit(1) // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade)
var path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
// boot scripts mount components like REST API
boot(app, __dirname)

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json())
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
    extended: true,
}))

// The access token is only available after boot
app.middleware('auth', loopback.token({
    model: app.models.accessToken,
}))

app.middleware('session:before', cookieParser(app.get('cookieSecret')))
app.middleware('session', session({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true,
}))
passportConfigurator.init()

// We need flash messages to see passport errors
app.use(flash())
app.use(fileUpload())

passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential,
})
for (var s in config) {
    var c = config[s]
    c.session = c.session !== false
    passportConfigurator.configureProvider(s, c)
}


function parseQuestion(question) {
    if (question.indexOf('?') === -1)
        throw new Error('Знак ? не найден')

    var [questionTitle, answers, ...extradata] = question.split('?\r\n')
    if (extradata.length)
        throw new Error('Найдено несколько знаков ? в одном вопросе')

    var answers = answers.split('\r\n')

    return {
        questionTitle,
        answers
    }
}

function saveQuestion(question, topicId, cb) {
    var Question = app.models.Question

    Question.create({
        title: question,
        weight: 1,
        topicId
    }, cb)
}
//TODO: pass cb and handle error
function saveAnswer(answer, questionId) {
    var Answer = app.models.Answer
    answer.replace(/\\r/g, '')
    if (answer.indexOf('=') === 0) {
        Answer.create({
            text: answer.substring(1),
            isRight: true,
            questionId
        })
        return
    }
    if (answer.indexOf('~') === 0) {
        Answer.create({
            text: answer.substring(1),
            isRight: false,
            questionId
        })
        return
    }
    if (answer.length === 0)
        return
    //TODO: правописание
    throw Error('Ни символ = ни символ ~ небыли найдены в ответе')
}
app.post('/:topicId/parseQuestion', function (req, resp) {
    var dataStr = req.files.file.data.toString()
    var questions = dataStr.split('\n\r\n')
    try {
        questions.forEach(question => {
            var {
                questionTitle,
                answers
            } = parseQuestion(question)

            saveQuestion(questionTitle, req.params.topicId, (err, question) => {
                answers.forEach((answer) => saveAnswer(answer, question.id))
            })
            //TODO: check that answers and questions saved
        })
    } catch (e) {
        resp.status(400).send(e.message)
    } finally {
        if (!resp.headersSent)
            resp.sendStatus(201)
    }
})


app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started')
        var baseUrl = app.get('url').replace(/\/$/, '')
        console.log('Web server listening at: %s', baseUrl)
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
        }
    })
}

// start the server if `$ node server.js`
if (require.main === module) {
    app.start()
}
//TODO: busboy classnames connect-ensure-login cors pug serve-favicon strong-error-handler

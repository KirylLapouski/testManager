// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-passport
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict'

let loopback = require('loopback')
let boot = require('loopback-boot')
let app = module.exports = loopback()
let cookieParser = require('cookie-parser')
let session = require('express-session')
// Passport configurators..
let loopbackPassport = require('loopback-component-passport')
let PassportConfigurator = loopbackPassport.PassportConfigurator
let passportConfigurator = new PassportConfigurator(app)
let fileUpload = require('express-fileupload')
/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
let bodyParser = require('body-parser')

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
let flash = require('express-flash')

// attempt to build the providers/passport config
let config = {}
try {
    config = require('../providers.json')
} catch (err) {
    console.trace(err)
    process.exit(1) // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade)
let path = require('path')
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
app.use(loopback.static(path.resolve(__dirname, './uploads')))

passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential,
})
for (let s in config) {
    let c = config[s]
    c.session = c.session !== false
    passportConfigurator.configureProvider(s, c)
}


app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started')
        let baseUrl = app.get('url').replace(/\/$/, '')
        console.log('Web server listening at: %s', baseUrl)
        if (app.get('loopback-component-explorer')) {
            let explorerPath = app.get('loopback-component-explorer').mountPath
            console.log('Browse your REST API at %s%s', baseUrl, explorerPath)
        }
    })
}

// start the server if `$ node server.js`
if (require.main === module) {
    app.start()
}
//TODO: busboy classnames connect-ensure-login cors pug serve-favicon strong-error-handler

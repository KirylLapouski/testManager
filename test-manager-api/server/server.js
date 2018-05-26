// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-passport
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade)
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// boot scripts mount components like REST API
boot(app, __dirname);

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/auth/yandex/callback', function(req, res, next) {
  request.post('https://oauth.yandex.ru/token', {
    form: {
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'client_id': 'c48956d9f59442bab960f373a6ca5ba2',
      'client_secret': '9e46f2c8fefb4f55bf63b06066431c4d',
    },
  }, function(err, httpResponse, body) {
    body = JSON.parse(body);
    var accessToken = body.access_token;
    var tokenResponseBody = body;
    request.get({
      url: 'https://login.yandex.ru/info',
      headers: {
        'Authorization': `OAuth ${accessToken}`,
      },
    }, function(err, httpResponse, body) {
      body = JSON.parse(body);
      var userId = body.id;
      var Participant = app.models.Participant;
      var accountParticipant;
      Participant.findOne({
        where: {
          email: `${body.login}@yandex.by`,
        },
      }, function(err, account) {
        if (!account) {
          request.post('http://localhost:3000/api/Participants', {
            form: {
              email: `${body.login}@yandex.by`,
              password: '1111',
            },
          }, function(err, user) {
            console.log(user);
            accountParticipant = user;
            var UserIdentity = app.models.UserIdentity;
            UserIdentity.findOne({
              externalId: userId,
            }, function(err, userIdentityModel) {
              request.patch('http://localhost:3000/api/UserIdentities', {
                form: {
                  'participantId': user.id,
                  'id': userIdentityModel.id,
                },
              });
            });
          });
        } else {
          accountParticipant = account;
        }

        console.log(accountParticipant);
        // request.post('http://localhost:3000/api/Participants/login', {
        //   form: {
        //     email: user.email,
        //     password: '1111',
        //   },
        // }, function(err, token) {
        //   // TODO: response new user token from redirect
        //   console.log(token);
        // });
        // TODO: response new user token from redirect
        accountParticipant.updateAttributes({
          yandexToken: accessToken,
          yandexTokenExpireIn: tokenResponseBody.expires_in,
          refreshToken: tokenResponseBody.refresh_token,
        });
        request.post('http://localhost:3000/api/Participants/login', {
          form: {
            email: accountParticipant.email,
            password: '1111',
          },
        }, function(err, token) {});
      });
    });
  });
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

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
var axios = require('axios');
var rp = require('request-promise');
var fileUpload = require('express-fileupload');

var createReadStream = require('fs').createReadStream;
var requestHttps = require('https').request;
var parse = require('url').parse;

var upload = require('ya-disk').upload;
var meta = require('ya-disk').meta;
var fs = require('fs')
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
app.use(fileUpload());

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
var checkLogged = (req, resp, next) => {
  console.log(req.cookies)
  console.log(req.headers.cookie)
}

app.post('/:id/setAvatar', checkLogged, function (req, resp) {
  //TODO: take token from req
  const API_TOKEN = 'AQAAAAAEyQZ1AAUBQNdGxaSB8EYSg32qncCS114'

  var sampleFile = req.files.imageFile
  sampleFile.mv(`./${sampleFile.name}`, function (err) {
    if (err)
      return res.status(500).send(err);

    upload.link(API_TOKEN, `app:/${sampleFile.name}`, true, ({
      href,
      method
    }) => {
      const fileStream = createReadStream(`./${sampleFile.name}`);

      const uploadStream = requestHttps(Object.assign(parse(href), {
        method
      }), () => {
        meta.get(API_TOKEN, `app:/${sampleFile.name}`, {}, (res) => {
          fs.unlink(`./${sampleFile.name}`)
          var Participant = app.models.Participant
          Participant.update({
            id: req.params.id
          }, {
            imageUrl: res.file
          }, (err, info) => {
            resp.sendStatus(201)
          })
        });
      })

      fileStream.pipe(uploadStream);

      fileStream.on('end', () => uploadStream.end());
    });

  });
})


app.get('/auth/yandex/callback', function (req, res, next) {
  request.post('https://oauth.yandex.ru/token', {
    form: {
      grant_type: 'authorization_code',
      code: req.query.code,
      client_id: 'c48956d9f59442bab960f373a6ca5ba2',
      client_secret: '9e46f2c8fefb4f55bf63b06066431c4d',
    },
  }, (err, response, body) => {

    body = JSON.parse(body);
    var tokenResponseBody = body;
    axios.get('https://login.yandex.ru/info', {
        headers: {
          'Authorization': `OAuth ${body.access_token}`,
        },
      })
      .then(({
        data,
      }) => {

        var yandexProfile = data;
        var Participant = app.models.Participant;
        Participant.findOne({
          where: {
            email: `${data.login}@yandex.by`,
          },
        }, function (err, account) {

          var promise = Promise.resolve(account);
          promise.then((account) => {
              if (!account) {
                return axios.post('http://localhost:3000/api/Participants', {
                  email: `${data.login}@yandex.by`,
                  password: '1111',
                });
              }
              return account;
            })
            .then((account) => {

              if (!account.yandexToken) {
                //yandex email exist in my db, but it doesnot has token
                return axios.patch('http://localhost:3000/api/Participants', {
                  id: account.id,
                  yandexToken: tokenResponseBody.access_token,
                  yandexRefreshToken: tokenResponseBody.refresh_token,
                  yandexTokenExpireIn: (new Date(Date.now() + (+tokenResponseBody.expires_in * 1000))).toDateString(),
                })
              }
              return account;
            })
            .then((account) => {

              if ((+Date.now()) > Date.parse(account.yandexTokenExpireIn)) {

                //yandex tokem expired
                return rp({
                    method: 'POST',
                    uri: 'https://oauth.yandex.ru/token',
                    formData: {
                      grant_type: 'refresh_token',
                      refresh_token: account.yandexRefreshToken,
                      client_id: 'c48956d9f59442bab960f373a6ca5ba2',
                      client_secret: '9e46f2c8fefb4f55bf63b06066431c4d',
                    },
                    json: true
                  })
                  .then(response => {
                    return axios.patch(`http://localhost:3000/api/Participants/${account.id}`, {
                      yandexToken: response.access_token,
                      yandexRefreshToken: response.refresh_token,
                      yandexTokenExpireIn: (new Date(Date.now() + (+response.expires_in * 1000))).toDateString(),
                    });
                  });
              }
              return {
                data: account
              }
            })
            .then(({
              data
            }) => {
              var account = data

              res.cookie('yandexToken',account.yandexToken, {maxAge:Date.parse(account.yandexTokenExpireIn)-Date.now()})
              return axios.post('http://localhost:3000/api/Participants/login', {
                email: account.email,
                password: '1111',
              });
            })
            .then(({
              data
            }) => {
              res.cookie('loopbackToken',data.id, {maxAge:new Date(data.ttl*1000)})
              return axios.patch(`http://localhost:3000/api/Participants/${data.userId}`, {
                id: data.userId,
                loopbackToken: data.id,
                loopbackTokenExpireIn: (new Date(data.ttl*1000  + Date.now())).toDateString()
              });
            })
            .then(({
              data
            }) => {
              res.redirect(`http://localhost:3001/cources/${data.id}`)
            })
          //TODO: error handling
          //TODO: can also check loopback token
          //TODO: response
        });
      });
  });
});

app.start = function () {
  // start the web server
  return app.listen(function () {
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

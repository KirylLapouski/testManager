module.exports = function(app) {
    let router = app.loopback.Router();
    let promisify = require("util").promisify;
    let axios = require("axios");
    let rp = require("request-promise");
    let request = require("request");
    let createReadStream = require("fs").createReadStream;
    let requestHttps = require("https").request;
    let parse = require("url").parse;

    let upload = require("ya-disk").upload;
    let meta = require("ya-disk").meta;
    let fs = require("fs");
    let path = require("path");

    //promisify
    // let findOneParticipant = promisify(app.models.Participant.findOne)
    let requestPost = promisify(request.post);
    let uploadLink = promisify(upload.link);
    let appendFile = promisify(fs.appendFile);

    router.get("/auth/yandex/callback", function(req, res) {
        let tokenResponseBody, user;
        requestPost("https://oauth.yandex.ru/token", {
            form: {
                grant_type: "authorization_code",
                code: req.query.code,
                client_id: "c48956d9f59442bab960f373a6ca5ba2",
                client_secret: "9e46f2c8fefb4f55bf63b06066431c4d"
            }
        })
            .then(({ body }) => {
                body = JSON.parse(body);
                tokenResponseBody = body;
                return axios.get("https://login.yandex.ru/info", {
                    headers: {
                        Authorization: `OAuth ${body.access_token}`
                    }
                });
            })
            .then(({ data }) => {
                user = data;
                return new Promise((resolve, reject) => {
                    app.models.Participant.findOne(
                        {
                            where: {
                                email: `${data.login}@yandex.by`
                            }
                        },
                        (err, account) => {
                            if (err) reject(err);
                            resolve(account);
                        }
                    );
                });
            })
            .then(account => {
                //TODO: need this promise?
                if (!account) {
                    return new Promise((resolve, reject) => {
                        app.models.Participant.create(
                            {
                                email: `${user.login}@yandex.by`,
                                password: "1111"
                            },
                            (err, newUser) => {
                                if (err) reject(err);
                                resolve(newUser);
                            }
                        );
                    });
                }
                return account;
            })
            .then(account => {
                if (account.data) account = account.data;

                if (!account.yandexToken) {
                    //yandex email exist in my db, but it doesnot has token
                    return axios.patch(
                        "http://localhost:3000/api/Participants",
                        {
                            id: account.id,
                            yandexToken: tokenResponseBody.access_token,
                            yandexRefreshToken: tokenResponseBody.refresh_token,
                            yandexTokenExpireIn: new Date(
                                Date.now() +
                                    +tokenResponseBody.expires_in * 1000
                            ).toDateString()
                        }
                    );
                }
                return account;
            })
            .then(account => {
                if (account.data) account = account.data;

                if (+Date.now() > Date.parse(account.yandexTokenExpireIn)) {
                    //yandex tokem expired
                    //TODO: can chain it in main chain?
                    return rp({
                        method: "POST",
                        uri: "https://oauth.yandex.ru/token",
                        formData: {
                            grant_type: "refresh_token",
                            refresh_token: account.yandexRefreshToken,
                            client_id: "c48956d9f59442bab960f373a6ca5ba2",
                            client_secret: "9e46f2c8fefb4f55bf63b06066431c4d"
                        },
                        json: true
                    }).then(response => {
                        return axios.patch(
                            `http://localhost:3000/api/Participants/${
                                account.id
                            }`,
                            {
                                yandexToken: response.access_token,
                                yandexRefreshToken: response.refresh_token,
                                yandexTokenExpireIn: new Date(
                                    Date.now() + +response.expires_in * 1000
                                ).toDateString()
                            }
                        );
                    });
                }
                return {
                    data: account
                };
            })
            .then(({ data }) => {
                let account = data;

                res.cookie("yandexToken", account.yandexToken, {
                    maxAge: +(
                        Date.parse(account.yandexTokenExpireIn) - Date.now()
                    )
                });
                return axios.post(
                    "http://localhost:3000/api/Participants/login",
                    {
                        email: account.email,
                        password: "1111"
                    }
                );
            })
            .then(({ data }) => {
                res.cookie("loopbackToken", data.id, {
                    maxAge: +new Date(data.ttl * 1000)
                });
                return axios.patch(
                    `http://localhost:3000/api/Participants/${data.userId}`,
                    {
                        id: data.userId,
                        loopbackToken: data.id,
                        loopbackTokenExpireIn: new Date(
                            data.ttl * 1000 + Date.now()
                        ).toDateString()
                    }
                );
            })
            .then(({ data }) => {
                res.redirect(`http://localhost:3001/cources/${data.id}`);
            });
        //TODO: error handling
        //TODO: can also check loopback token
        //TODO: response
    });

    let checkLoggedAsYandexUser = (req, resp, next) => {
        if (!req.cookies.yandexToken)
            resp.status(400).send("It is not a yandex user");
        next();
    };
    router.post("/:id/saveFile", checkLoggedAsYandexUser, function(req, resp) {
        const API_TOKEN = req.cookies.yandexToken;

        let sampleFile = req.files.file;
        appendFile(
            path.resolve(__dirname, `../uploads/${sampleFile.name}`),
            req.files.file.data
        )
            .catch(err => {
                console.log(err);
                if (err) return resp.status(500).send(err);
            })
            //TODO: FIRST TODO upload link promisifying incorrect(does not create reject if error because of 2 callbacs )
            .then(() => uploadLink(API_TOKEN, `app:/${sampleFile.name}`, true))
            .then(null, ({ href, method }) => {
                const fileStream = createReadStream(
                    path.resolve(__dirname, `../uploads/${sampleFile.name}`)
                );

                const uploadStream = requestHttps(
                    Object.assign(parse(href), {
                        method
                    }),
                    () => {
                        meta.get(
                            API_TOKEN,
                            `app:/${sampleFile.name}`,
                            {},
                            res => {
                                fs.unlink(
                                    path.resolve(
                                        __dirname,
                                        `../uploads/${sampleFile.name}`
                                    )
                                );

                                axios
                                    .put(
                                        `https://cloud-api.yandex.net/v1/disk/resources/publish?path=app:/${
                                            sampleFile.name
                                        }`,
                                        null,
                                        {
                                            headers: {
                                                Authorization: `OAuth ${API_TOKEN}`
                                            }
                                        }
                                    )
                                    .then(({ data }) => {
                                        return axios.get(data.href, {
                                            headers: {
                                                Authorization: `OAuth ${API_TOKEN}`
                                            }
                                        });
                                    })
                                    .then(({ data }) => {
                                        resp.status(201).send(data.file);
                                    });
                            }
                        );
                    }
                );

                fileStream.pipe(uploadStream);

                fileStream.on("end", () => uploadStream.end());
            });
    });

    //TODO: only yandex users can set avatar?!!!!!
    //TODO: error handling when parse tests
    router.post("/:id/setAvatar", checkLoggedAsYandexUser, function(req, resp) {
        const API_TOKEN = req.cookies.yandexToken;

        let sampleFile = req.files.imageFile;

        new Promise((resolve, reject) => {
            upload.link(
                API_TOKEN,
                `app:/${sampleFile.name}`,
                true,
                success => resolve(success),
                err => reject(err)
            );
        })
            .then(({ href }) => {
                return new Promise((resolve, reject) => {
                    request.put(
                        {
                            url: href,
                            formData: {
                                file: {
                                    value: sampleFile.data,
                                    options: {
                                        contentType: sampleFile.mimetype
                                    }
                                }
                            }
                        },
                        (err, httpResponse, body) => {
                            if (err) reject(err);
                            resolve(body);
                        }
                    );
                });
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    meta.get(
                        API_TOKEN,
                        `app:/${sampleFile.name}`,
                        {},
                        res => resolve(res),
                        err => reject(err)
                    );
                });
            })
            .then(res => {
                return new Promise((resolve, reject) => {
                    app.models.Participant.upsert(
                        {
                            id: req.params.id,
                            imageUrl: res.file
                        },
                        (err, res) => {
                            if (err) reject(err);
                            resolve(res);
                        }
                    );
                });
            })
            .then(
                () => {
                    resp.sendStatus(201);
                },
                error => {
                    console.error(error);
                }
            );
        //TODO: url name too long change max length of imgName
    });
    app.use(router);
};

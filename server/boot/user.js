module.exports = function (app) {
    let router = app.loopback.Router()

    //TODO: only yandex users can set avatar?!!!!!
    //TODO: error handling when parse tests
    router.patch('/:id/setAvatar', function (req, resp) {
        new Promise((resolve, reject) => {
            app.models.Participant.upsert(
                {
                    id: req.params.id,
                    imageUrl: req.body.url
                },
                (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                }
            )
        })
            .then(() => {
                resp.sendStatus(201)
            },
                error => {
                    console.error(error)
                })
        //TODO: url name too long change max length of imgName
    })

    app.use(router)
}

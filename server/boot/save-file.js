module.exports = function (app) {
    let router = app.loopback.Router()
    const fs = require('fs')
    const path = require('path')
    const promisify = require('util').promisify
    let appendFile = promisify(fs.appendFile)


    router.post('/:userId/saveFileLocal', function (req, resp) {
        appendFile(path.resolve(__dirname, `../uploads/${req.files.file.name}`), req.files.file.data)
            .catch((err) => {
                console.log(err)
            })
            .then(() => {
                resp.status(201).send(`http://localhost:3000/${req.files.file.name}`)
            })

    })

    app.use('/save-file', router)
}

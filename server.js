const express = require('express'),
    body_parser = require('body-parser')
    db = require('./db')
    conf = require('./conf')
    userController = require('./controllers/user')

const app = express()

db.connect(conf.mongouri, 'heroku_m9dkxksk', (err) => {
    if(err) {
        return console.log(err)
    }
    app.listen(conf.port)
})

app.use(body_parser.json())

app.post('/reg', userController.add)



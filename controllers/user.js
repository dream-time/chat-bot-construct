const user = require('../models/user')
const bcrypt = require('bcrypt')

exports.add = (req, res) => {
    bcrypt.hash(req.body['password'], 10, (err, hash) => {
        user.add({
            login: req.body.user,
            password: hash
        }, (err, result) => {
            if(err){
                console.log(err)
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    })
}
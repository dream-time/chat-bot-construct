const user = require('../models/user')
const password_hash = require('password-hash')
const hash = require('../parts/hash')

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
}


exports.reg = (req, res) => {
    user.reg({
        login: req.body.user,
        password: password_hash.generate(req.body.password)
    }, (err, result) => {
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        res.sendStatus(200)
    })
}

exports.login = (req, res) => {
    var usr;
    user.all((err, docs) => {
        docs.map((item, index) => {
            if(item.login == req.body["login"]) {
                usr = item;
            }
            console.log(item.login, req.body["login"])
        })
    })
    console.log(usr)
    if(password_hash.verify(req.body["password"].toString().trim(), usr.password.toString().trim())){
        res.send(hash.saltHashPassword(req.body.user.toString().trim() + req.body.password.toString().trim() + Date.now().toString()))
    }
}
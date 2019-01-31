const user = require('../models/user')
const hash = require('../parts/hash')

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
}


exports.add = (req, res) => {
    user.add({
        login: req.body.user,
        password: hash.saltHashPassword(req.body["password"])
    }, (err, result) => {
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        res.sendStatus(200)
    })
}
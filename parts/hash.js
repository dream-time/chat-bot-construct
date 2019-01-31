const crypto = require('crypto')

var genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0,length)
}

var sha512 = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    var value = hash.digest('hex')
    return {
        salt: salt,
        passwordHash: value
    }
}

exports.saltHashPassword = (userpassword) => {
    var salt = genRandomString(16)
    return sha512(userpassword, salt)
}

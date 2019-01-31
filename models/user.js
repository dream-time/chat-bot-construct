const db = require('../db')

exports.reg = (item, cb) => {
    db.get().collection('users').insert(item, (err, docs) => {
        cb(err, docs)
    })
}
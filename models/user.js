const db = require('../db')

exports.reg = (item, cb) => {
    db.get().collection('users').insert(item, (err, result) => {
        cb(err, result)
    })
}

exports.all = (cb) => {
    db.get().collection('users').find().toArray((err, docs) => {
        cb(err, docs)
    })
}
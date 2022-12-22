const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    if(!req.headers.authorization){
        let err = new Error('Authorization token missing.')
        return next(err)
    }
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return next(err)
        console.log(decoded)
        req.user = decoded
        next()
    })
}

module.exports = {verifyUser}
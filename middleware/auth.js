const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const requestToken = req.headers.authorization.split[1]
        const decodedToken = jwt.verify(requestToken, 'RANDOM_TOKEN_SECRET')
        const requestTokenUserId = decodedToken.userId
        console.log('req token: ', requestToken)
        console.log('decoded token: ', decodedToken)
        req.auth = {userId: requestTokenUserId}
        if (!req.auth.userId) throw 'invalid token'
        else next()
    } catch {
        res.status(401).send({ error: 'unauthorized request'})
    }
}
const jwt = require('jsonwebtoken')
const { networkInterfaces } = require('os')

module.exports = (req, res, next) => {

    const requestToken = req.headers.authorization.split(' ')[1]
    console.log('req token: ' + requestToken)
    jwt.verify(requestToken, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(400).json({ error: err })
        } else {
            const requestUserId = decoded.user_id
            req.auth = {userId: requestUserId}
            if (req.auth.userId !== req.params.id) {
                res.status(401).json({ message: 'unauthorized request'})
            } else {
                next()
            }
        }
    })

    // try {
    //     const requestToken = req.headers.authorization.split(' ')[1]
    //     console.log('req token: ' + requestToken)
    //     const decodedToken = jwt.verify(requestToken, 'RANDOM_TOKEN_SECRET')
    //     console.log('decoded token: ' + decodedToken)
    //     const requestTokenUserId = decodedToken.user_id
    //     console.log(requestTokenUserId)
    //     // console.log('req token: ', requestToken)
    //     // console.log('decoded token: ', decodedToken)
    //     req.auth = {userId: requestTokenUserId}
    //     if (!req.auth.userId || req.auth.userId ==! req.params.id) throw 'invalid token'
    //     else next()
    // } catch {
    //     res.status(401).send({ error: 'unauthorized request'})
    // }
}
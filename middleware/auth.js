const jwt = require('jsonwebtoken')
const { networkInterfaces } = require('os')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log('no auth')
        return res.status(401).json({ error: 'no auth'})
    }
    const requestToken = req.headers.authorization.split(' ')[1]
    console.log('req token: ' + requestToken)
    jwt.verify(requestToken, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(400).json({  err })
        } else {
            const requestUserId = decoded.user_id
            const requestUserRole = decoded.user_role
            console.log(requestUserRole)
            req.auth = {userId: requestUserId}
            if (req.auth.userId !== req.params.id && requestUserRole !== 'admin') {
                console.log('role: ' + requestUserRole)
                console.log('paramsId: ' + req.params.id)
                console.log('reqId: ' + req.auth.userId)
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
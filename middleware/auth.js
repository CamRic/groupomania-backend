const jwt = require('jsonwebtoken')
const { networkInterfaces } = require('os')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log('no auth')
        return res.status(401).json({ error: 'no auth'})
    }
    const requestToken = req.headers.authorization.split(' ')[1]
    jwt.verify(requestToken, 'RANDOM_TOKEN_SECRET', (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: 'unauthorized request' })
        } else {
            const requestUserId = decoded.user_id
            const requestUserRole = decoded.user_role
            req.auth = {userId: requestUserId, userRole: requestUserRole}
            next()
        }
    })

}
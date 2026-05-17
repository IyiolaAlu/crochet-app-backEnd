const jwtToken = require('jsonwebtoken')

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwtToken

    if (token) {
        jwtToken.verify(token, process.env.TOKEN_SECRET, (err, decodedToken)=>{
            if (err) {
                return res.status(401).json({message: 'Login to make this request'})
            }else{
                req.user = decodedToken
                next()
            }
        })
    }else{
        return res.status(401).json({message: 'Login to make this request'})
    }
}

module.exports = requireAuth
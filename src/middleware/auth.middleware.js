const jwt = require ("jsonwebtoken")
const usermodel = require ("../models/user.model")


async function authmiddleware(req,res,next){

    const { token } = req.cookies

    if(!token){
        return res.status(401).json({
            message: "invalid token"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRATE)

        const user = await usermodel.findById(decode.id).select("-password")
        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}


module.exports = authmiddleware
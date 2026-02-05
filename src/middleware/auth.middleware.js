const jwt = require ("jsonwebtoken")
const usermodel = require ("../models/user.model")


async function authmiddleware(req,res,next){

    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message: "invalid token.."
        })
    }

    try {
        
        const decode = jwt.verify(token, process.env.JWT_SECRATE)
        console.log(decode)

        const user = await usermodel.findById(decode.id).select("-password")
        req.user = user
        next()


    } catch (error) {
            console.log(error)        
    }


    
}

module.exports = authmiddleware
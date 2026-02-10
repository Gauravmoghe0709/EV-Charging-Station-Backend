const usermodel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



async function registeruser(req, res) {

    const { name, email, password, role } = req.body

    const isuser = await usermodel.findOne({ email })

    if (isuser) {
        return res.status(400).json({
            message: "user already exist"
        })
    }

    const user = await usermodel.create({
        name,
        password: await bcrypt.hash(password, 10), // hashing a password
        email,
        role
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRATE)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    return res.status(201).json({
        message: "New user created sucessfully..."
    })

}

async function loginuser(req, res) {

    const { email, password } = req.body

    try {
        const user = await usermodel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "üser does not exist"
            })
        }

        const ispassword = await bcrypt.compare(password, user.password)

        if (!ispassword) {
            return res.status(401).json({
                message: "Password dose not match"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRATE)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
           sameSite: "none",
           path: "/",
        });


        res.status(200).json({
            message: "login sucessfully..",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        })
    } catch (error) {
        console.log(error)
    }

}
async function logout(req, res) {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none", })
    res.status(200).json({
        message: "Logout sucessfully..."
    })
}
async function aboutme(req, res) {

    try {
        const user = await usermodel.findById(req.user.id)

        if (!user) {
            return res.status(401).json({
                message: "user not exist"
            })
        }

        res.status(201).json({
            message: "User Fetch sucessfully",
            user: req.user
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    registeruser,
    loginuser,
    logout,
    aboutme
}
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwtToken = require('../services/auth.service')
const signup = async (req, res) => {
    try {
        const { email, password } = req.body
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            return res.status(409).json({
                message: "user already exist"
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "password must be max 6 letter"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashPassword
        })

        const token = jwtToken(user)
        return res.status(201).json({
            message: 'account create succesfully',
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            message:"not creat user",
            error
        })
    }
}


const signin = async (req, res) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message : "user not found"
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(404).json({
            message: "password mismatch"
          })
        }
        const token = jwtToken(user)
        res.status(200).json({
            message: "sign in succesfully",
            token : token
        })
    } catch (error) {
          res.status(500).json({
            message: 'user login unsucessfull',
            error
          })
    }

}



module.exports = { signin, signup }
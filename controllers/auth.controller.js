import jwt  from "jsonwebtoken"
import { UserModel } from "../models/user.model.js"
import { comparePassword } from "../utils/utils.js"
import dotenv from 'dotenv'

dotenv.config()
export const LoginController = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email:email}).select('password').exec()
        console.log(email + password)
        if(user){
           
            const isMatch = await comparePassword(password, user.password)

            if(isMatch){
               
                user.token = jwt.sign({ userId: user._id }, process.env.EXPRESS_SECRET_KEY, {expiresIn : "1h"})
                user.save()

                return res.status(201).json({
                    message: "Login successful",
                    user   : user,
                    token  : user.token
                })
            }

            return res.status(500).json({
                message: "Data incorrect, please verify"
            })
        }

        return res.status(500).json({
            message: "User not exists"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const LogoutController = async (req, res) => {
    const token = (req.header('Authorization').split(" "))[1]
    const {email} = req.body

    try {
        const user = await UserModel.findOne({email:email, token:token}).exec()
        user.token = ""
        user.save()
        
        res.removeHeader("Authorization");
        res.removeHeader("X-Powered-By");

        return res.status(200).json({
            message: "Adios"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
import { ExpressValidator, check } from "express-validator"
import { UserModel } from "../models/user.model.js"

export const REQUEST = {
    name        : check('name').exists().not().isEmpty(),
    last_name   : check('last_name').exists().not().isEmpty(),
    email       : check('email').exists().isEmail().not().isEmpty().custom((email) => {
                    const user = UserModel.find({email:email}).exec()
                    if(user){
                        return true
                    }
                
                    throw new Error('Email already exists')
                }),
    password:   check('password').exists().not().isEmpty().isLength({min: 8})
}
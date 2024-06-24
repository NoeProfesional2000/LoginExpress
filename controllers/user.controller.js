import { UserModel } from '../models/user.model.js'
import { hashPassword, comparePassword } from '../utils/utils.js'
import {sendEmail} from '../services/emailer.js'

export const getUsersController = async (req, res) => {
    try {
        const user = await UserModel.find().sort({createdAt : 'desc'})
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getOneUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserModel.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const storeUserController = async (req, res) => {
    const { name, last_name, email, password } = req.body
    try {
        const user      = await new UserModel()
        user.name       = name
        user.last_name  = last_name
        user.email      = email
        user.password   = await hashPassword(password)
        user.save()

        sendEmail(req,res)
        return res.status(201).json({
            message: 'User created successfully',
            user   : user
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const editUserController = async (req, res) => {
    const { id } = req.params
    const { name, last_name, email, password } = req.body
    try {
        const user     = await UserModel.findByIdAndUpdate(id,{
            name       : name,
            last_name  : last_name,
            email      : email
        })

        return res.status(201).json({ 
            message: 'User edited successfully',
            user   : user 
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const changeStatusUserController = async (req, res) => {
    const { id }    = req.params
    const { status }= req.body
    try {
        const user     = await UserModel.findByIdAndUpdate(id,{
            status       : status,
        })

        return res.status(201).json({ 
            message: 'Status changed',
            user   : user 
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}
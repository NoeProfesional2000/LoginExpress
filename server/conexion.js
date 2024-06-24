import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD

export const connect = async () => {
    return mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.2hqeaun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then((response) => {
        return console.log("Conectado...")
    }).catch((error)=>{
        return console.error(error)
    })
}

export const disconnect = mongoose.disconnect()
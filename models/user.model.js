import mongoose, {Schema} from 'mongoose'

const UserSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            select:false
        },
        status:{
            type:Boolean,
            required:true,
            default:1
        },
        token:{
            type:String,
            required:false,
            default:null
        }
    },
    {
        timestamps:true
    }
)

export const UserModel = mongoose.model('users', UserSchema)